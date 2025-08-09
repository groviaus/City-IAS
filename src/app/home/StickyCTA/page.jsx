"use client";

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useRegistrationDialog } from "@/components/GlobalRegistrationDialog";

export default function StickyCTA() {
  const { openDialog } = useRegistrationDialog();

  return (
    <motion.div
      className="fixed bottom-4 rounded-full bg-black right-4 z-50 md:hidden"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Button
          size="lg"
          onClick={() => openDialog()}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-2xl rounded-full px-6 drop-shadow-2xl"
        >
          <Phone className="mr-2 h-5 w-5" />
          Apply Now
        </Button>
      </motion.div>
    </motion.div>
  );
}
