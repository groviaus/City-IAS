"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  XCircle,
  Loader2,
  User,
  Phone,
  Mail,
  MapPin,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  validateName,
  validatePhone,
  validateEmail,
  validateCourse,
  validateCityState,
} from "@/lib/validation";

// Create context for global registration dialog
const RegistrationDialogContext = createContext();

export const useRegistrationDialog = () => {
  const context = useContext(RegistrationDialogContext);
  if (!context) {
    throw new Error(
      "useRegistrationDialog must be used within RegistrationDialogProvider"
    );
  }
  return context;
};

export const RegistrationDialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [showCourseSelection, setShowCourseSelection] = useState(false);

  const openDialog = (course = "") => {
    if (course) {
      setSelectedCourse(course);
      setShowCourseSelection(false);
    } else {
      setShowCourseSelection(true);
    }
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedCourse("");
    setShowCourseSelection(false);
  };

  return (
    <RegistrationDialogContext.Provider
      value={{ openDialog, closeDialog, isOpen }}
    >
      {children}
      <GlobalRegistrationDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        showCourseSelection={showCourseSelection}
        setShowCourseSelection={setShowCourseSelection}
      />
    </RegistrationDialogContext.Provider>
  );
};

function GlobalRegistrationDialog({
  isOpen,
  onOpenChange,
  selectedCourse,
  setSelectedCourse,
  showCourseSelection,
  setShowCourseSelection,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: selectedCourse || "",
    cityState: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const courseOptions = [
    "FREE Coaching Program",
    "Foundation Batch for 12th Pass",
  ];

  // Update course when selectedCourse prop changes
  useEffect(() => {
    if (selectedCourse) {
      setFormData((prev) => ({ ...prev, course: selectedCourse }));
    }
  }, [selectedCourse]);

  // Auto-hide success/error messages after 3 seconds
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
        if (submitStatus === "success") {
          onOpenChange(false);
          setFormData({
            name: "",
            phone: "",
            email: "",
            course: selectedCourse || "",
            cityState: "",
          });
          setErrors({});
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus, onOpenChange, selectedCourse]);

  // Real-time validation functions
  const validateField = (fieldName, value) => {
    let validation = { isValid: true, error: "" };

    switch (fieldName) {
      case "name":
        validation = validateName(value);
        break;
      case "phone":
        validation = validatePhone(value);
        break;
      case "email":
        validation = validateEmail(value);
        break;
      case "course":
        validation = validateCourse(value);
        break;
      case "cityState":
        validation = validateCityState(value);
        break;
      default:
        break;
    }

    return validation;
  };

  // Handle input changes with real-time validation
  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  // Handle input blur with validation
  const handleInputBlur = (fieldName, value) => {
    const validation = validateField(fieldName, value);
    if (!validation.isValid) {
      setErrors((prev) => ({ ...prev, [fieldName]: validation.error }));
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    const requiredFields = ["name", "phone", "email", "course", "cityState"];
    return requiredFields.every((field) => {
      const validation = validateField(field, formData[field]);
      return validation.isValid;
    });
  };

  // Handle course selection
  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setFormData((prev) => ({ ...prev, course }));
    setShowCourseSelection(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    let hasErrors = false;

    Object.keys(formData).forEach((fieldName) => {
      const validation = validateField(fieldName, formData[fieldName]);
      if (!validation.isValid) {
        newErrors[fieldName] = validation.error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 10) {
      return cleaned;
    }
    return cleaned.slice(0, 10);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto scrollbar-hide">
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.5,
          }}
        >
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Join Our IAS Program
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              Take the first step towards your IAS dream. Fill out the form
              below to get started.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success/Error Messages */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-800 font-medium">
                    Application submitted successfully! We'll contact you soon.
                  </span>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3"
                >
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-800 font-medium">
                    Please check the form and try again.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Full Name</span>
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                onBlur={(e) => handleInputBlur("name", e.target.value)}
                className={`${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 flex items-center space-x-1"
                >
                  <XCircle className="h-3 w-3" />
                  <span>{errors.name}</span>
                </motion.p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Phone Number</span>
              </label>
              <Input
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={formData.phone}
                onChange={(e) =>
                  handleInputChange("phone", formatPhoneNumber(e.target.value))
                }
                onBlur={(e) => handleInputBlur("phone", e.target.value)}
                maxLength={10}
                className={`${
                  errors.phone
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              />
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 flex items-center space-x-1"
                >
                  <XCircle className="h-3 w-3" />
                  <span>{errors.phone}</span>
                </motion.p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email Address</span>
              </label>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={(e) => handleInputBlur("email", e.target.value)}
                className={`${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 flex items-center space-x-1"
                >
                  <XCircle className="h-3 w-3" />
                  <span>{errors.email}</span>
                </motion.p>
              )}
            </div>

            {/* Course Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Select Course</span>
              </label>

              {showCourseSelection ? (
                <div className="space-y-2">
                  {courseOptions.map((course, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => handleCourseSelect(course)}
                      className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">
                          {course}
                        </span>
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <Input
                    type="text"
                    value={formData.course}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCourseSelection(true)}
                      className="text-xs"
                    >
                      Change Course
                    </Button>
                    {formData.course && (
                      <span className="text-xs text-gray-500 flex items-center">
                        ✓ Course selected
                      </span>
                    )}
                  </div>
                </div>
              )}

              {errors.course && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 flex items-center space-x-1"
                >
                  <XCircle className="h-3 w-3" />
                  <span>{errors.course}</span>
                </motion.p>
              )}
            </div>

            {/* City & State Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>City & State</span>
              </label>
              <Input
                type="text"
                placeholder="Enter your city and state"
                value={formData.cityState}
                onChange={(e) => handleInputChange("cityState", e.target.value)}
                onBlur={(e) => handleInputBlur("cityState", e.target.value)}
                className={`${
                  errors.cityState
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              />
              {errors.cityState && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 flex items-center space-x-1"
                >
                  <XCircle className="h-3 w-3" />
                  <span>{errors.cityState}</span>
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>

            {/* Privacy Notice */}
            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to our privacy policy and
              consent to being contacted regarding your application.
            </p>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
