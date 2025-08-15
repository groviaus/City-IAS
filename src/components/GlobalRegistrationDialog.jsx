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
  const [applicationUpdateTrigger, setApplicationUpdateTrigger] = useState(0);

  const courseOptions = [
    "FREE Coaching Program",
    "Foundation Batch for 12th Pass",
  ];

  // Course prices configuration
  const coursePrices = {
    "FREE Coaching Program": 1,
    "Foundation Batch for 12th Pass": 5000, // ₹5000
  };

  // Update course when selectedCourse prop changes
  useEffect(() => {
    if (selectedCourse) {
      setFormData((prev) => ({ ...prev, course: selectedCourse }));
    }
  }, [selectedCourse]);

  // Check for existing user data and prefill form when dialog opens
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      // Check if user has existing data in localStorage
      const existingUserData = localStorage.getItem("userData");
      if (existingUserData) {
        try {
          const userData = JSON.parse(existingUserData);
          if (userData.isRegistered) {
            // Prefill form with existing user data
            setFormData(prev => ({
              ...prev,
              name: userData.name || "",
              phone: userData.phone || "",
              email: userData.email || "",
              cityState: userData.cityState || "",
            }));
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("userData");
        }
      }

      // Check for pending applications for the selected course
      if (selectedCourse) {
        const pendingApplications = localStorage.getItem("pendingApplications");
        if (pendingApplications) {
          try {
            const parsed = JSON.parse(pendingApplications);
            const coursePendingApp = parsed.find(
              (app) => app.course === selectedCourse && app.status === "pending"
            );
            if (coursePendingApp) {
              setFormData({
                name: coursePendingApp.name,
                phone: coursePendingApp.phone,
                email: coursePendingApp.email,
                course: coursePendingApp.course,
                cityState: coursePendingApp.cityState,
              });
              setCurrentApplicationId(coursePendingApp.applicationId);
              setSubmitStatus("pending");
            }
          } catch (error) {
            console.error("Error parsing pending applications:", error);
          }
        }
      }
    }
  }, [isOpen, selectedCourse, applicationUpdateTrigger]);

  // Debug: Monitor application status changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pendingApplications = localStorage.getItem("pendingApplications");
      if (pendingApplications) {
        try {
          const parsed = JSON.parse(pendingApplications);
          console.log("Current applications in localStorage:", parsed);
        } catch (error) {
          console.error("Error parsing applications:", error);
        }
      }
    }
  }, [applicationUpdateTrigger]);

  // Auto-hide success messages after 5 seconds and close dialog
  useEffect(() => {
    if (submitStatus === "success" || submitStatus === "paid") {
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
      }, submitStatus === "paid" ? 8000 : 5000); // Show paid message longer

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
    // Check if user already has an application for this course
    if (hasAppliedForCourse(course)) {
      alert(`You have already applied for ${course}. Please select a different course.`);
      return;
    }

    // Course is available for application
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
          console.log("Payment success callback triggered:", paymentResponse);
          
          // Payment successful - update status to "paid" and show success message
          setSubmitStatus("paid");
          console.log("Submit status set to 'paid'");
          
          // Update application status in localStorage to "paid"
          if (typeof window !== 'undefined') {
            const existingApplications = localStorage.getItem("pendingApplications");
            if (existingApplications) {
              try {
                const applications = JSON.parse(existingApplications);
                const updatedApplications = applications.map((app) =>
                  app.applicationId === applicationData.applicationId
                    ? { ...app, status: "paid" }
                    : app
                );
                localStorage.setItem(
                  "pendingApplications",
                  JSON.stringify(updatedApplications)
                );
                console.log("Updated localStorage with paid status");
              } catch (error) {
                console.error("Error updating applications:", error);
              }
            }
          }
          
          // Force a re-render to update the UI immediately
          setFormData(prev => ({ ...prev }));
          setCurrentApplicationId(null);
          
          // Trigger a re-render to update course selection display
          setApplicationUpdateTrigger(prev => prev + 1);
          
          console.log("Payment success callback completed");
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
      if (typeof window !== 'undefined') {
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
      }
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

        // Save user data for future prefilling with isRegistered flag
        if (typeof window !== 'undefined') {
          localStorage.setItem("userData", JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            cityState: formData.cityState,
            isRegistered: true,
          }));

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
        }

        setCurrentApplicationId(result.data.applicationId);

        // Check if payment is required
        const coursePrice = coursePrices[formData.course];
        if (coursePrice > 0) {
          // Proceed to payment
          await handlePayment(applicationData, coursePrice);
        } else {
          // Free course - mark as approved
          setSubmitStatus("success");
          // Update application status
          if (typeof window !== 'undefined') {
            const updatedApplications = applications.map((app) =>
              app.applicationId === applicationData.applicationId
                ? { ...app, status: "approved" }
                : app
            );
            localStorage.setItem(
              "pendingApplications",
              JSON.stringify(updatedApplications)
            );
          }
        }
      } else {
        setSubmitStatus("error");
        if (result.errors) {
          setErrors(result.errors);
        }
        // Handle duplicate application error specifically
        if (result.message && result.message.includes("already applied")) {
          alert("You have already applied for this course. Please select a different course.");
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

  // Check if user has existing data
  const hasExistingUserData = () => {
    if (typeof window === 'undefined') return false; // Server-side check
    
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        return parsed.isRegistered === true;
      } catch (error) {
        return false;
      }
    }
    return false;
  };

  // Check if user has applied for a specific course
  const hasAppliedForCourse = (course) => {
    if (typeof window === 'undefined') return false; // Server-side check
    
    const pendingApplications = localStorage.getItem("pendingApplications");
    if (pendingApplications) {
      try {
        const parsed = JSON.parse(pendingApplications);
        const existingApp = parsed.find(app => app.course === course);
        console.log(`Checking course ${course}:`, existingApp);
        return existingApp ? existingApp.status : false;
      } catch (error) {
        console.error("Error parsing applications:", error);
        return false;
      }
    }
    return false;
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
                : hasExistingUserData()
                ? "Welcome back! Your details are prefilled. You can edit them if needed or proceed with the application."
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
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      submitStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : submitStatus === "approved"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {submitStatus === "paid"
                        ? "Paid"
                        : submitStatus === "approved"
                        ? "Approved"
                        : "Pending"}
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
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        submitStatus === "paid"
                          ? "bg-green-100 text-green-800"
                          : submitStatus === "approved"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {submitStatus === "paid"
                          ? "Paid"
                          : submitStatus === "approved"
                          ? "Approved"
                          : "Pending"}
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

                  {/* Option 2: Proceed to Payment (only for paid courses and pending status) */}
                  {coursePrices[formData.course] > 0 && submitStatus !== "paid" ? (
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
                  ) : coursePrices[formData.course] > 0 && submitStatus === "paid" ? (
                    <div className="text-center p-3 bg-green-100 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <p className="text-green-700 text-sm font-medium">
                        Payment completed! Your course is booked.
                      </p>
                    </div>
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
                    {submitStatus === "paid" 
                      ? "Your course is successfully booked! Our team will contact you soon."
                      : "Click \"Proceed to Payment\" to open Razorpay payment gateway"}
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

              {/* Paid Status Message */}
              {submitStatus === "paid" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg text-center"
                >
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-green-800 font-medium">
                    Your course has been booked and our team will contact you soon.
                  </p>
                  <p className="text-green-700 text-sm mt-1">
                    Payment completed successfully! Welcome to City IAS Academy.
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

                {submitStatus === "paid" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-800 font-medium">
                      Your course has been booked and our team will contact you soon.
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
                  {hasExistingUserData() && (
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      Prefilled
                    </span>
                  )}
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
                  // Show tip if user has existing data
                  return hasExistingUserData() ? (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        💡 <strong>Tip:</strong> Your details are saved! When you apply for another course, 
                        the form will be automatically prefilled with your information.
                      </p>
                    </div>
                  ) : null;
                })()}

                {showCourseSelection ? (
                  <div className="space-y-2">
                    {courseOptions.map((course, index) => {
                      const applicationStatus = hasAppliedForCourse(course);
                      const hasApplied = applicationStatus !== false;
                      
                      return (
                        <motion.button
                          key={index}
                          type="button"
                          onClick={() => handleCourseSelect(course)}
                          className={`w-full p-3 text-left border rounded-lg transition-all duration-200 ${
                            hasApplied
                              ? applicationStatus === "paid"
                                ? "border-green-300 bg-green-50 cursor-pointer"
                                : applicationStatus === "approved"
                                ? "border-blue-300 bg-blue-50 cursor-pointer"
                                : "border-yellow-300 bg-yellow-50 cursor-pointer"
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
                              {hasApplied && (
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  applicationStatus === "paid"
                                    ? "bg-green-100 text-green-800"
                                    : applicationStatus === "approved"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {applicationStatus === "paid"
                                    ? "Paid"
                                    : applicationStatus === "approved"
                                    ? "Approved"
                                    : "Pending"}
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

              {/* User Data Management */}
              {hasExistingUserData() && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs text-green-700 mb-2">
                    ✅ <strong>Your details are prefilled!</strong> You can edit any field if needed, 
                    or clear all data to start fresh.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        localStorage.removeItem("userData");
                      }
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        course: selectedCourse || "",
                        cityState: "",
                      });
                    }}
                    className="text-xs text-green-600 hover:text-green-700"
                  >
                    Clear All Data
                  </Button>
                </div>
              )}
            </form>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
