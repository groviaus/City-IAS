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
  CreditCard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  validateName,
  validatePhone,
  validateEmail,
  validateCourse,
  validateCityState,
} from "@/lib/validation";
import { openRazorpayCheckout } from "@/lib/razorpay";

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
  const [currentApplicationId, setCurrentApplicationId] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const courseOptions = [
    "FREE Coaching Program",
    "Foundation Batch for 12th Pass",
  ];

  // Course prices configuration
  const coursePrices = {
    "FREE Coaching Program": 100,
    "Foundation Batch for 12th Pass": 5000, // ₹5000
  };

  // Update course when selectedCourse prop changes
  useEffect(() => {
    if (selectedCourse) {
      setFormData((prev) => ({ ...prev, course: selectedCourse }));
    }
  }, [selectedCourse]);

  // Check localStorage for pending applications when dialog opens
  useEffect(() => {
    if (isOpen) {
      const pendingApplications = localStorage.getItem("pendingApplications");
      if (pendingApplications) {
        try {
          const parsed = JSON.parse(pendingApplications);
          // Find the most recent pending application
          const mostRecentPending = parsed.find(
            (app) => app.status === "pending"
          );
          if (mostRecentPending) {
            setFormData({
              name: mostRecentPending.name,
              phone: mostRecentPending.phone,
              email: mostRecentPending.email,
              course: mostRecentPending.course,
              cityState: mostRecentPending.cityState,
            });
            setCurrentApplicationId(mostRecentPending.applicationId);
            setSubmitStatus("pending");
            // Don't automatically trigger payment - let user choose
          }
        } catch (error) {
          console.error("Error parsing pending applications:", error);
          localStorage.removeItem("pendingApplications");
        }
      } else {
        // Check for old single application format (backward compatibility)
        const oldPendingApplication =
          localStorage.getItem("pendingApplication");
        if (oldPendingApplication) {
          try {
            const parsed = JSON.parse(oldPendingApplication);
            if (parsed.status === "pending") {
              setFormData({
                name: parsed.name,
                phone: parsed.phone,
                email: parsed.email,
                course: parsed.course,
                cityState: parsed.cityState,
              });
              setCurrentApplicationId(parsed.applicationId);
              setSubmitStatus("pending");
              // Don't automatically trigger payment - let user choose
            }
          } catch (error) {
            console.error("Error parsing old pending application:", error);
            localStorage.removeItem("pendingApplication");
          }
        }
      }
    }
  }, [isOpen]);

  // Auto-hide success messages after 5 seconds and close dialog
  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => {
        onOpenChange(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          course: selectedCourse || "",
          cityState: "",
        });
        setErrors({});
        setSubmitStatus(null);
        setCurrentApplicationId(null);
      }, 5000);

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
    // Check if user already has a pending application for this course
    const pendingApplication = localStorage.getItem("pendingApplication");
    if (pendingApplication) {
      try {
        const parsed = JSON.parse(pendingApplication);
        if (parsed.course === course && parsed.status === "pending") {
          // User already has a pending application for this course
          setSelectedCourse(course);
          setFormData({
            name: parsed.name,
            phone: parsed.phone,
            email: parsed.email,
            course: parsed.course,
            cityState: parsed.cityState,
          });
          setCurrentApplicationId(parsed.applicationId);
          setSubmitStatus("pending");
          setShowCourseSelection(false);
          return;
        }
      } catch (error) {
        console.error("Error parsing pending application:", error);
      }
    }

    setSelectedCourse(course);
    setFormData((prev) => ({ ...prev, course }));
    setShowCourseSelection(false);
  };

  // Handle payment processing
  const handlePayment = async (applicationData, amount) => {
    setIsProcessingPayment(true);

    try {
      // Create Razorpay order
      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          receipt: `receipt_${applicationData.applicationId}_${Date.now()}`,
          applicationId: applicationData.applicationId,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to create payment order");
      }

      // Open Razorpay checkout
      await openRazorpayCheckout(
        result.order,
        applicationData,
        async (paymentResponse) => {
          // Payment successful
          setSubmitStatus("success");
          localStorage.removeItem("pendingApplication");
          setCurrentApplicationId(null);
        },
        (error) => {
          // Payment failed
          console.error("Payment failed:", error);
          setSubmitStatus("error");
        }
      );
    } catch (error) {
      console.error("Payment error:", error);
      setSubmitStatus("error");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Handle direct payment for pending applications
  const handleDirectPayment = async () => {
    if (!currentApplicationId) return;

    const coursePrice = coursePrices[formData.course];
    if (coursePrice > 0) {
      const applicationData = {
        ...formData,
        applicationId: currentApplicationId,
        status: "pending",
      };
      await handlePayment(applicationData, coursePrice);
    } else {
      // For free courses, mark as success immediately
      setSubmitStatus("success");

      // Update application status in localStorage
      const existingApplications = localStorage.getItem("pendingApplications");
      if (existingApplications) {
        try {
          const applications = JSON.parse(existingApplications);
          const updatedApplications = applications.map((app) =>
            app.applicationId === currentApplicationId
              ? { ...app, status: "approved" }
              : app
          );
          localStorage.setItem(
            "pendingApplications",
            JSON.stringify(updatedApplications)
          );
        } catch (error) {
          console.error("Error updating applications:", error);
        }
      }

      localStorage.removeItem("pendingApplication");
      setCurrentApplicationId(null);
    }
  };

  // Reset form and clear localStorage
  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      course: selectedCourse || "",
      cityState: "",
    });
    setErrors({});
    setSubmitStatus(null);
    setCurrentApplicationId(null);
    // Don't clear localStorage - just reset the form view
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
        const applicationData = {
          ...result.data,
          status: "pending",
        };

        // Save to localStorage (support multiple applications)
        const existingApplications = localStorage.getItem(
          "pendingApplications"
        );
        let applications = [];

        if (existingApplications) {
          try {
            applications = JSON.parse(existingApplications);
          } catch (error) {
            console.error("Error parsing existing applications:", error);
            applications = [];
          }
        }

        // Add new application
        applications.push(applicationData);
        localStorage.setItem(
          "pendingApplications",
          JSON.stringify(applications)
        );

        // Also save to old format for backward compatibility
        localStorage.setItem(
          "pendingApplication",
          JSON.stringify(applicationData)
        );

        setCurrentApplicationId(result.data.applicationId);

        // Check if payment is required
        const coursePrice = coursePrices[formData.course];
        if (coursePrice > 0) {
          // Proceed to payment
          await handlePayment(applicationData, coursePrice);
        } else {
          // Free course - mark as approved
          setSubmitStatus("success");
          // Remove from pending applications
          const updatedApplications = applications.map((app) =>
            app.applicationId === applicationData.applicationId
              ? { ...app, status: "approved" }
              : app
          );
          localStorage.setItem(
            "pendingApplications",
            JSON.stringify(updatedApplications)
          );
          localStorage.removeItem("pendingApplication");
        }
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

  const pendingApplications = localStorage.getItem("pendingApplications");
  if (pendingApplications) {
    const applications = [];
    try {
      const parsed = JSON.parse(pendingApplications);
      applications.push(...parsed);
    } catch (error) {
      console.error("Error parsing pending applications:", error);
    }
  }

  // Check for old single application format
  const oldPendingApplication = localStorage.getItem("pendingApplication");
  if (oldPendingApplication) {
    try {
      const parsed = JSON.parse(oldPendingApplication);
      // Only add if not already in applications array
      if (
        !applications.find((app) => app.applicationId === parsed.applicationId)
      ) {
        applications.push(parsed);
      }
    } catch (error) {
      console.error("Error parsing old pending application:", error);
    }
  }

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
              {submitStatus === "pending" && currentApplicationId
                ? "Application Submitted Successfully!"
                : "Join Our IAS Program"}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              {submitStatus === "pending" && currentApplicationId
                ? "Your application has been submitted. Choose what you'd like to do next."
                : "Take the first step towards your IAS dream. Fill out the form below to get started."}
            </DialogDescription>
          </DialogHeader>

          {submitStatus === "pending" && currentApplicationId ? (
            <div className="space-y-6">
              {/* Application Summary */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">
                  Application Submitted
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Course:</span>
                    <span className="font-medium">{formData.course}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                      Pending
                    </span>
                  </div>
                  {coursePrices[formData.course] > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium">
                        ₹{coursePrices[formData.course]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Show other applications if any */}
                <div className="mt-4 pt-3 border-t border-blue-200">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">
                    Your Applications:
                  </h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">{formData.course}</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Options Section */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-center mb-4">
                  <h4 className="text-green-800 font-medium mb-2">
                    What would you like to do next?
                  </h4>
                  <p className="text-green-700 text-sm">
                    Choose from the options below to continue
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Option 1: Register for Another Course */}
                  <Button
                    onClick={() => {
                      setSubmitStatus(null);
                      setCurrentApplicationId(null);
                      setShowCourseSelection(true);
                      // Clear form data but keep course selection open
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        course: "",
                        cityState: "",
                      });
                      setErrors({});
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Register for Another Course
                  </Button>

                  {/* Option 2: Proceed to Payment (only for paid courses) */}
                  {coursePrices[formData.course] > 0 ? (
                    <Button
                      onClick={handleDirectPayment}
                      disabled={isProcessingPayment}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Proceed to Payment ₹{coursePrices[formData.course]}
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="text-center p-3 bg-green-100 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <p className="text-green-700 text-sm font-medium">
                        This course is free - no payment required
                      </p>
                    </div>
                  )}
                </div>

                {coursePrices[formData.course] > 0 && (
                  <p className="text-xs text-green-600 text-center mt-3">
                    Click "Proceed to Payment" to open Razorpay payment gateway
                  </p>
                )}
              </div>

              {/* Success Message */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg text-center"
                >
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-green-800 font-medium">
                    {coursePrices[formData.course] > 0
                      ? "Payment successful! Your application has been approved."
                      : "Application completed successfully!"}
                  </p>
                  <p className="text-green-700 text-sm mt-1">
                    We'll contact you soon with further details.
                  </p>
                </motion.div>
              )}
            </div>
          ) : (
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
                      {coursePrices[formData.course] > 0
                        ? "Payment successful! Your application has been approved."
                        : "Application submitted successfully! We'll contact you soon."}
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
                    handleInputChange(
                      "phone",
                      formatPhoneNumber(e.target.value)
                    )
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

                {(() => {
                  // Check if user has any pending applications
                  const pendingApplications = localStorage.getItem(
                    "pendingApplications"
                  );
                  const oldPendingApplication =
                    localStorage.getItem("pendingApplication");
                  let hasPendingApplications = false;

                  if (pendingApplications) {
                    try {
                      const parsed = JSON.parse(pendingApplications);
                      hasPendingApplications = parsed.some(
                        (app) => app.status === "pending"
                      );
                    } catch (error) {
                      console.error(
                        "Error parsing pending applications:",
                        error
                      );
                    }
                  }

                  if (!hasPendingApplications && oldPendingApplication) {
                    try {
                      const parsed = JSON.parse(oldPendingApplication);
                      hasPendingApplications = parsed.status === "pending";
                    } catch (error) {
                      console.error(
                        "Error parsing old pending application:",
                        error
                      );
                    }
                  }

                  return hasPendingApplications ? (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        💡 <strong>Tip:</strong> You can apply for multiple
                        courses. Courses with pending applications will be
                        highlighted.
                      </p>
                    </div>
                  ) : null;
                })()}

                {showCourseSelection ? (
                  <div className="space-y-2">
                    {courseOptions.map((course, index) => {
                      // Check if user already has a pending application for this course
                      const pendingApplication =
                        localStorage.getItem("pendingApplication");
                      let hasPendingApplication = false;
                      let applicationStatus = "";

                      if (pendingApplication) {
                        try {
                          const parsed = JSON.parse(pendingApplication);
                          if (parsed.course === course) {
                            hasPendingApplication = true;
                            applicationStatus = parsed.status;
                          }
                        } catch (error) {
                          console.error(
                            "Error parsing pending application:",
                            error
                          );
                        }
                      }

                      return (
                        <motion.button
                          key={index}
                          type="button"
                          onClick={() => handleCourseSelect(course)}
                          className={`w-full p-3 text-left border rounded-lg transition-all duration-200 ${
                            hasPendingApplication
                              ? "border-yellow-300 bg-yellow-50 cursor-pointer"
                              : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">
                                {course}
                              </span>
                              {hasPendingApplication && (
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    applicationStatus === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {applicationStatus === "pending"
                                    ? "Pending"
                                    : "Applied"}
                                </span>
                              )}
                            </div>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          </div>
                        </motion.button>
                      );
                    })}
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
                  onChange={(e) =>
                    handleInputChange("cityState", e.target.value)
                  }
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
                disabled={!isFormValid() || isSubmitting || isProcessingPayment}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : isProcessingPayment ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>

              {/* Action Buttons for Success/Error States */}
              {(submitStatus === "pending" || submitStatus === "success") && (
                <div className="space-y-3">
                  {/* Apply for Another Course Button */}
                  <Button
                    type="button"
                    onClick={() => {
                      setSubmitStatus(null);
                      setCurrentApplicationId(null);
                      setShowCourseSelection(true);
                      // Clear form data but keep course selection open
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        course: "",
                        cityState: "",
                      });
                      setErrors({});
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Apply for Another Course
                  </Button>
                </div>
              )}

              {/* Privacy Notice */}
              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our privacy policy and
                consent to being contacted regarding your application.
              </p>
            </form>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
