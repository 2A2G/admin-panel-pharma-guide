"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  title?: string;
  variant?: "success" | "error" | "warning" | "info";
}

const iconMap = {
  success: <CheckCircle className="h-6 w-6 text-green-600" />,
  error: <AlertCircle className="h-6 w-6 text-red-500" />,
  warning: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
  info: <Info className="h-6 w-6 text-blue-500" />,
};

const bgMap = {
  success: "bg-green-50",
  error: "bg-red-50",
  warning: "bg-yellow-50",
  info: "bg-blue-50",
};

const borderMap = {
  success: "border-green-300",
  error: "border-red-300",
  warning: "border-yellow-300",
  info: "border-blue-300",
};

export default function CenteredModal({
  isOpen,
  onClose,
  message,
  title = "Mensaje",
  variant = "info",
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "sm:max-w-md border-t-4",
          bgMap[variant],
          borderMap[variant]
        )}
      >
        <DialogHeader>
          <div className="flex items-center gap-2">
            {iconMap[variant]}
            <DialogTitle className="text-gray-800">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-gray-700">
            {message}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={onClose}
            className={cn("text-white", {
              "bg-green-300 hover:bg-green-400": variant === "success",
              "bg-red-500 hover:bg-red-600": variant === "error",
              "bg-yellow-500 hover:bg-yellow-600": variant === "warning",
              "bg-blue-500 hover:bg-blue-600": variant === "info",
            })}
          >
            Aceptar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
