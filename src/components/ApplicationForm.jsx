"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { validateName, validatePhone, validateEmail, validateCourse, validateCityState } from "@/lib/validation";

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    cityState: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Auto-hide success/error messages after 3 seconds
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

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
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: "" }));
    }

    // Real-time validation (only if field has content)
    if (value.trim()) {
      const validation = validateField(fieldName, value);
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, [fieldName]: validation.error }));
      }
    }
  };

  // Handle input blur for final validation
  const handleInputBlur = (fieldName, value) => {
    const validation = validateField(fieldName, value);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, [fieldName]: validation.error }));
    } else {
      setErrors(prev => ({ ...prev, [fieldName]: "" }));
    }
  };

  // Phone number formatting
  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, "");
    // Limit to 10 digits
    return phoneNumber.slice(0, 10);
  };

  // Handle phone number input
  const handlePhoneChange = (value) => {
    const formattedPhone = formatPhoneNumber(value);
    handleInputChange("phone", formattedPhone);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const validations = {
      name: validateName(formData.name),
      phone: validatePhone(formData.phone),
      email: validateEmail(formData.email),
      course: validateCourse(formData.course),
      cityState: validateCityState(formData.cityState),
    };

    const newErrors = {};
    let hasErrors = false;

    Object.keys(validations).forEach(field => {
      if (!validations[field].isValid) {
        newErrors[field] = validations[field].error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

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
        // Reset form on success
        setFormData({
          name: "",
          phone: "",
          email: "",
          course: "",
          cityState: "",
        });
        setErrors({});
      } else {
        setSubmitStatus("error");
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    {
      name: "name",
      placeholder: "Your Full Name",
      type: "text",
      validation: (value) => validateName(value),
    },
    {
      name: "phone",
      placeholder: "Your Phone Number",
      type: "tel",
      validation: (value) => validatePhone(value),
      customChange: handlePhoneChange,
    },
    {
      name: "email",
      placeholder: "Your Email Address",
      type: "email",
      validation: (value) => validateEmail(value),
    },
    {
      name: "course",
      placeholder: "Enter Course Name",
      type: "text",
      validation: (value) => validateCourse(value),
    },
    {
      name: "cityState",
      placeholder: "Enter State and City",
      type: "text",
      validation: (value) => validateCityState(value),
    },
  ];

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-white">Ready to Begin?</h3>
      
      {/* Success/Error Messages */}
      <AnimatePresence>
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg flex items-center space-x-2"
          >
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-green-100">
              Application submitted successfully! We'll contact you soon.
            </span>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg flex items-center space-x-2"
          >
            <XCircle className="h-5 w-5 text-red-400" />
            <span className="text-red-100">
              Please check the form and try again.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-1"
          >
            <Input
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={(e) => 
                field.customChange 
                  ? field.customChange(e.target.value)
                  : handleInputChange(field.name, e.target.value)
              }
              onBlur={(e) => handleInputBlur(field.name, e.target.value)}
              className={`bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 transition-all ${
                errors[field.name] ? "border-red-400 focus:border-red-400" : ""
              }`}
              disabled={isSubmitting}
            />
            
            {/* Error Message */}
            <AnimatePresence>
              {errors[field.name] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-300 text-sm flex items-center space-x-1"
                >
                  <XCircle className="h-3 w-3" />
                  <span>{errors[field.name]}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-500 text-blue-900 hover:bg-amber-400 text-lg py-6 font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <ArrowRight className="mr-2 h-5 w-5" />
                Start My IAS Journey Now
              </>
            )}
          </Button>
        </motion.div>
      </form>

      <p className="text-sm text-blue-100 mt-4 text-center">
        🔒 Your information is 100% secure and confidential
      </p>
    </motion.div>
  );
} 