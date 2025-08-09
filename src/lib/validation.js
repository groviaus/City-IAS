// Validation utilities for form fields

/**
 * Validates name field - only letters allowed (no numbers or special characters)
 * @param {string} name - The name to validate
 * @returns {object} - Validation result with isValid and error message
 */
export function validateName(name) {
  if (!name || name.trim() === "") {
    return { isValid: false, error: "Name is required" };
  }

  // Remove extra spaces and trim
  const cleanName = name.trim().replace(/\s+/g, " ");

  // Check if name contains only letters and spaces
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(cleanName)) {
    return {
      isValid: false,
      error: "Name can only contain letters and spaces",
    };
  }

  // Check minimum length
  if (cleanName.length < 2) {
    return { isValid: false, error: "Name must be at least 2 characters long" };
  }

  // Check maximum length
  if (cleanName.length > 50) {
    return { isValid: false, error: "Name cannot exceed 50 characters" };
  }

  return { isValid: true, error: "", cleanValue: cleanName };
}

/**
 * Validates phone number - exactly 10 digits, only numeric values, valid Indian phone number
 * @param {string} phone - The phone number to validate
 * @returns {object} - Validation result with isValid and error message
 */
export function validatePhone(phone) {
  if (!phone || phone.trim() === "") {
    return { isValid: false, error: "Phone number is required" };
  }

  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, "");

  // Check if it's exactly 10 digits
  if (cleanPhone.length !== 10) {
    return { isValid: false, error: "Phone number must be exactly 10 digits" };
  }

  // Check if it contains only numbers
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, error: "Phone number can only contain numbers" };
  }

  // Validate Indian phone number format (starts with 6, 7, 8, 9)
  const indianPhoneRegex = /^[6-9]\d{9}$/;
  if (!indianPhoneRegex.test(cleanPhone)) {
    return {
      isValid: false,
      error: "Please enter a valid Indian phone number",
    };
  }

  return { isValid: true, error: "", cleanValue: cleanPhone };
}

/**
 * Validates email address format
 * @param {string} email - The email to validate
 * @returns {object} - Validation result with isValid and error message
 */
export function validateEmail(email) {
  if (!email || email.trim() === "") {
    return { isValid: false, error: "Email address is required" };
  }

  const cleanEmail = email.trim().toLowerCase();

  // Basic email format validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleanEmail)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  // Check for common email providers (additional validation)
  const domain = cleanEmail.split("@")[1];
  const commonDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "rediffmail.com",
    "live.com",
  ];

  if (
    !commonDomains.includes(domain) &&
    !domain.includes(".co.in") &&
    !domain.includes(".in")
  ) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  return { isValid: true, error: "", cleanValue: cleanEmail };
}

/**
 * Validates course field - allows letters, numbers, spaces, and common punctuation including ordinal suffixes
 * @param {string} course - The course to validate
 * @returns {object} - Validation result with isValid and error message
 */
export function validateCourse(course) {
  if (!course || course.trim() === "") {
    return { isValid: false, error: "Course is required" };
  }

  const cleanCourse = course.trim();

  // Check if course contains letters, numbers, spaces, and common punctuation including ordinal suffixes
  const courseRegex = /^[A-Za-z0-9\s\-&(),]+$/;
  if (!courseRegex.test(cleanCourse)) {
    return {
      isValid: false,
      error:
        "Course can only contain letters, numbers, spaces, and basic punctuation",
    };
  }

  // Check minimum length
  if (cleanCourse.length < 3) {
    return {
      isValid: false,
      error: "Course must be at least 3 characters long",
    };
  }

  // Check maximum length
  if (cleanCourse.length > 100) {
    return { isValid: false, error: "Course cannot exceed 100 characters" };
  }

  return { isValid: true, error: "", cleanValue: cleanCourse };
}

/**
 * Validates city and state field - only text allowed (no numbers)
 * @param {string} cityState - The city and state to validate
 * @returns {object} - Validation result with isValid and error message
 */
export function validateCityState(cityState) {
  if (!cityState || cityState.trim() === "") {
    return { isValid: false, error: "City and State is required" };
  }

  const cleanCityState = cityState.trim();

  // Check if city and state contains only letters, spaces, and common punctuation
  const cityStateRegex = /^[A-Za-z\s\-&(),]+$/;
  if (!cityStateRegex.test(cleanCityState)) {
    return {
      isValid: false,
      error:
        "City and State can only contain letters, spaces, and basic punctuation",
    };
  }

  // Check minimum length
  if (cleanCityState.length < 3) {
    return {
      isValid: false,
      error: "City and State must be at least 3 characters long",
    };
  }

  // Check maximum length
  if (cleanCityState.length > 100) {
    return {
      isValid: false,
      error: "City and State cannot exceed 100 characters",
    };
  }

  return { isValid: true, error: "", cleanValue: cleanCityState };
}

/**
 * Validates all form fields at once
 * @param {object} formData - Object containing all form fields
 * @returns {object} - Validation result with isValid, errors object, and clean data
 */
export function validateForm(formData) {
  const errors = {};
  const cleanData = {};
  let isValid = true;

  // Validate name
  const nameValidation = validateName(formData.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error;
    isValid = false;
  } else {
    cleanData.name = nameValidation.cleanValue;
  }

  // Validate phone
  const phoneValidation = validatePhone(formData.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.error;
    isValid = false;
  } else {
    cleanData.phone = phoneValidation.cleanValue;
  }

  // Validate email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
    isValid = false;
  } else {
    cleanData.email = emailValidation.cleanValue;
  }

  // Validate course
  const courseValidation = validateCourse(formData.course);
  if (!courseValidation.isValid) {
    errors.course = courseValidation.error;
    isValid = false;
  } else {
    cleanData.course = courseValidation.cleanValue;
  }

  // Validate city and state
  const cityStateValidation = validateCityState(formData.cityState);
  if (!cityStateValidation.isValid) {
    errors.cityState = cityStateValidation.error;
    isValid = false;
  } else {
    cleanData.cityState = cityStateValidation.cleanValue;
  }

  return {
    isValid,
    errors,
    cleanData,
  };
}
