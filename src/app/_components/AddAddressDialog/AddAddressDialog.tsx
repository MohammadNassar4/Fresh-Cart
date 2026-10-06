import { addAddress } from "@/apis/actions/addressesActions/addAddress";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function AddAddressDialog({
  cls,
  children,
}: {
  cls: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<AddressFormDataType>({
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
  });

  async function formSubmit(data: AddressFormDataType) {
    const response = await addAddress(data);
    if (response.status === "success") {
      toast.add({ type: "success", description: "Address added successfully" })
      queryClient.invalidateQueries({ queryKey: ["getUserAddresses"] });
      setIsOpen(false);
    } else {
      toast.add({ type: "error", description: "Failed to add address" })
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<button className={cls}>{children}</button>} />
      <DialogContent className="sm:max-w-sm md:max-w-lg">
        <form onSubmit={handleSubmit(formSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Add New Address
            </DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor={field.name}
                  >
                    Address Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Home, Work"
                    type="text"
                    autoComplete="off"
                    className="focus-visible:ring-green-200 focus-visible:ring-2 focus-visible:border-green-300 py-5 rounded-md"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="details"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor={field.name}
                  >
                    Full Address
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Street, building, apartment, etc."
                    autoComplete="off"
                    className="focus-visible:ring-green-200 focus-visible:ring-2 focus-visible:border-green-300 py-2 rounded-md"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="sm:flex gap-4 mb-4">
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="block text-sm font-medium text-gray-700 mb-2"
                      htmlFor={field.name}
                    >
                      Phone Number
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="01xxxxxxxxx"
                      type="tel"
                      autoComplete="off"
                      className="focus-visible:ring-green-200 focus-visible:ring-2 focus-visible:border-green-300 py-5 rounded-md"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="mt-4 sm:mt-0"
                  >
                    <FieldLabel
                      className="block text-sm font-medium text-gray-700 mb-2"
                      htmlFor={field.name}
                    >
                      City
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Cairo"
                      type="text"
                      autoComplete="off"
                      className="focus-visible:ring-green-200 focus-visible:ring-2 focus-visible:border-green-300 py-5 rounded-md"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
          <DialogFooter className="bg-white">
            <DialogClose
              render={
                <button className="flex-1 py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors cursor-pointer">
                  Cancel
                </button>
              }
            />
            <button
              type="submit"
              className="flex-1 py-3 px-6 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 shadow-lg shadow-green-600/25 cursor-pointer"
            >
              Add Address
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export interface AddressFormDataType {
  name: string;
  details: string;
  phone: string;
  city: string;
}
