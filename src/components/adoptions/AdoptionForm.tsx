import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, PawPrint } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const adoptionFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  location: z.string().min(2, "Please enter your location"),
  experience: z.string().min(1, "Please select your experience level"),
  reason: z.string().min(10, "Please tell us why you want to adopt this pet"),
});

type AdoptionFormData = z.infer<typeof adoptionFormSchema>;

interface AdoptionFormProps {
  petName: string;
  petBreed: string;
  onSubmit: (data: AdoptionFormData) => void;
  onClose: () => void;
}

const AdoptionForm = ({
  petName,
  petBreed,
  onSubmit,
  onClose,
}: AdoptionFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AdoptionFormData>({
    resolver: zodResolver(adoptionFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      location: "",
      experience: "",
      reason: "",
    },
  });

  const handleSubmit = async (data: AdoptionFormData) => {
    setIsSubmitting(true);

    // Simulate form processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onSubmit(data);
    setIsSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-md max-h-[90vh] overflow-y-auto border-brand-primary/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-primary">
                  Adopt {petName}
                </h3>
                <p className="text-gray-600 text-sm">{petBreed}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-brand-primary/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., +254712345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Nairobi, Mombasa, Kisumu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pet Experience</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white shadow-lg">
                        <SelectItem value="first-time" className="hover:bg-brand-primary/10">
                          First-time pet owner
                        </SelectItem>
                        <SelectItem value="some" className="hover:bg-brand-primary/10">
                          Some experience with pets
                        </SelectItem>
                        <SelectItem value="experienced" className="hover:bg-brand-primary/10">
                          Very experienced with pets
                        </SelectItem>
                        <SelectItem value="professional" className="hover:bg-brand-primary/10">
                          Professional (vet, trainer, etc.)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why do you want to adopt {petName}?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us briefly why you'd like to adopt this pet..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white font-semibold py-2 rounded-lg shadow-lg transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Contact Breeder on WhatsApp"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  This info helps breeders identify serious adopters.
                  You&apos;ll be connected via WhatsApp to discuss further.
                </p>
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default AdoptionForm;
