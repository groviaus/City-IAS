"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRegistrationDialog } from "./GlobalRegistrationDialog";

export default function AutoRegistrationPopup() {
  const { openDialog } = useRegistrationDialog();

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem("registrationPopupShown");

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        openDialog(); // Open without pre-selected course
        sessionStorage.setItem("registrationPopupShown", "true");
      }, 7000); // 7 seconds delay

      return () => clearTimeout(timer);
    }
  }, [openDialog]);

  return null; // This component doesn't render anything visible
}
