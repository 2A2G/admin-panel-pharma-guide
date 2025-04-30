"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit } from "lucide-react";

interface EditModalProps {
  title?: string;
  description?: string;
  fields?: Array<{
    name: string;
    label: string;
    type?:
      | "text"
      | "number"
      | "email"
      | "date"
      | "textarea"
      | "select"
      | "checkbox";
    options?: { value: string; label: string }[];
    placeholder?: string;
  }>;
  data?: Record<string, any>;
  onSubmit: (formData: Record<string, any>) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  triggerButton?: boolean;
}

export default function EditModal({
  title = "Editar registro",
  description = "Realiza los cambios necesarios y guarda.",
  fields = [],
  data = {},
  onSubmit,
  isOpen,
  setIsOpen,
  triggerButton = true,
}: EditModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData({ ...data });
    }
  }, [data, isOpen]);

  const handleChange = (field: any, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setIsOpen(false);
  };

  const renderField = (field: {
    name: string;
    label: string;
    type?:
      | "text"
      | "number"
      | "email"
      | "date"
      | "textarea"
      | "select"
      | "checkbox"
      | undefined;
    options?: { value: string; label: string }[] | undefined;
    placeholder?: string | undefined;
  }) => {
    const {
      name,
      label,
      type = "text",
      options = [],
      placeholder = "",
    } = field;

    switch (type) {
      case "text":
      case "number":
      case "email":
      case "date":
        return (
          <div className="grid gap-2" key={name}>
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              name={name}
              type={type}
              value={formData[name] || ""}
              onChange={(e) => handleChange(name, e.target.value)}
              placeholder={placeholder}
            />
          </div>
        );

      case "textarea":
        return (
          <div className="grid gap-2" key={name}>
            <Label htmlFor={name}>{label}</Label>
            <Textarea
              id={name}
              name={name}
              value={formData[name] || ""}
              onChange={(e) => handleChange(name, e.target.value)}
              placeholder={placeholder}
            />
          </div>
        );

      case "select":
        return (
          <div className="grid gap-2" key={name}>
            <Label htmlFor={name}>{label}</Label>
            <Select
              value={formData[name] || ""}
              onValueChange={(value) => handleChange(name, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2" key={name}>
            <Checkbox
              id={name}
              checked={!!formData[name]}
              onCheckedChange={(checked) => handleChange(name, checked)}
            />
            <Label htmlFor={name}>{label}</Label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {triggerButton && (
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <Edit className="h-4 w-4" />
          <span className="sr-only">Editar</span>
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">{fields.map(renderField)}</div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Guardar cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
