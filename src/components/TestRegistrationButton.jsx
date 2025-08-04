"use client";

import { Button } from "@/components/ui/button";
import { useRegistrationDialog } from "./GlobalRegistrationDialog";

export default function TestRegistrationButton() {
  const { openDialog } = useRegistrationDialog();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => openDialog()}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Test Registration Dialog
      </Button>
    </div>
  );
}
