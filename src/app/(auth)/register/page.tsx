"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { FaFacebook, FaGoogle, FaStar, FaUserPlus } from "react-icons/fa";
import { FaShieldHalved, FaTruckFast } from "react-icons/fa6";
import avatar from "../../../assets/images/register-avatar.png";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { registerSchema } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { registerUser } from "@/apis/actions/auth.actions";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function Register() {
  const router = useRouter();
  
  const { handleSubmit, control, formState: { isSubmitting} } = useForm<zod.infer<typeof registerSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function submitForm(data: zod.infer<typeof registerSchema>) {
    const isRegistered = await registerUser(data);
    if (isRegistered) {
      toast.add({
        title: "Success",
        description: "Account created successfully",
      });
      router.push("/login");
    } else {
      toast.add({
        title: "Error",
        description: "Failed to create account",
      });
    }
  }

  return (
    <section className="text-[#364153] my-8">
      <div className="container xl:max-w-7xl mx-auto p-4 flex flex-col lg:flex-row gap-8">
        <div className="left-side lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Welcome to <span className="text-teal-600">FreshCart</span>
          </h2>
          <p className="font-medium md:text-xl mb-4">
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>
          <ul className="flex flex-col gap-6 mb-7">
            <li className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-200 flex items-center justify-center shrink-0">
                <FaStar className="text-teal-600 text-2xl" />
              </div>
              <div className="content">
                <div className="font-semibold text-lg">Premium Quality</div>
                <div className="font-medium">
                  Premium quality products sourced from trusted suppliers.
                </div>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-200 flex items-center justify-center shrink-0">
                <FaTruckFast className="text-teal-600 text-2xl" />
              </div>
              <div className="content">
                <div className="font-semibold text-lg">Fast Delivery</div>
                <div className="font-medium">
                  Same-day delivery available in most areas
                </div>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-200 flex items-center justify-center shrink-0">
                <FaShieldHalved className="text-teal-600 text-2xl" />
              </div>
              <div className="content">
                <div className="font-semibold text-lg">Secure Shopping</div>
                <div className="font-medium">
                  Your data and payments are completely secure
                </div>
              </div>
            </li>
          </ul>

          <div className="p-4 rounded-md bg-white shadow">
            <div className="flex gap-3 items-center mb-4">
              <div className="w-12 h-12 rounded-full">
                <Image src={avatar} alt="user avatar" />
              </div>
              <div>
                <div className="font-medium">Sarah Johnson</div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="text-yellow-400">
                      <FaStar />
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <blockquote className="font-medium italic">
              &ldquo;FreshCart has transformed my shopping experience. The
              quality of the products is outstanding, and the delivery is always
              on time. Highly recommend!&rdquo;
            </blockquote>
          </div>
        </div>

        <div className="right-side lg:w-1/2 bg-white rounded-2xl shadow py-10 px-6">
          <h2 className="font-semibold text-3xl text-center mb-3">
            Create Your Account
          </h2>
          <div className="font-medium text-center">
            Start your fresh journey with us today
          </div>
          <div className="relative flex flex-col sm:flex-row gap-2 py-8 border-b border-gray-300 mb-6 after:content-['or'] after:absolute after:-bottom-3 after:bg-white after:left-1/2 after:-translate-x-1/2 after:text-gray-500 after:px-3">
            <button className="flex items-center gap-3 rounded-lg border border-gray-200 py-2 px-4 text-[#101828] font-semibold sm:w-1/2 justify-center cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-all duration-200">
              <FaGoogle className="text-[#E7000B]" /> Google
            </button>
            <button className="flex items-center gap-3 rounded-lg border border-gray-200 py-2 px-4 text-[#101828] font-semibold sm:w-1/2 justify-center cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-all duration-200">
              <FaFacebook className="text-[#155DFC]" /> Facebook
            </button>
          </div>
          <form onSubmit={handleSubmit(submitForm)} className="w-full">
            <FieldGroup className="border-b pb-4">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="after:content-['*']"
                    >
                      Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Ali"
                      autoComplete="off"
                      type="text"
                      className="focus-visible:ring-teal-200 focus-visible:ring-2 focus-visible:border-teal-300 py-5 rounded-md"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="after:content-['*']"
                    >
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="john@example.com"
                      autoComplete="off"
                      type="email"
                      className="focus-visible:ring-teal-200 focus-visible:ring-2 focus-visible:border-teal-300 py-5 rounded-md"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="after:content-['*']"
                    >
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="create a strong password"
                      autoComplete="off"
                      type="password"
                      className="focus-visible:ring-teal-200 focus-visible:ring-2 focus-visible:border-teal-300 py-5 rounded-md"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="rePassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="after:content-['*']"
                    >
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="confirm your password"
                      autoComplete="off"
                      type="password"
                      className="focus-visible:ring-teal-200 focus-visible:ring-2 focus-visible:border-teal-300 py-5 rounded-md"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="after:content-['*']"
                    >
                      Phone Number
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="+1 234 567 8900"
                      autoComplete="off"
                      type="tel"
                      className="focus-visible:ring-teal-200 focus-visible:ring-2 focus-visible:border-teal-300 py-5 rounded-md"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field orientation="horizontal">
                <Checkbox id="terms-checkbox" name="terms-checkbox" required />
                <Label htmlFor="terms-checkbox">
                  I agree to the{" "}
                  <Link href="/terms" className="text-teal-600">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-teal-600">
                    Privacy Policy
                  </Link>{" "}
                  *
                </Label>
              </Field>
              <Field orientation="horizontal">
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="bg-teal-600 rounded-lg w-full p-5.5 font-semibold text-white text-md hover:bg-teal-700 cursor-pointer"
                >
                  <FaUserPlus /> Create My Account {isSubmitting && <Spinner />}
                </Button>
              </Field>
            </FieldGroup>
            <div className="mt-8 text-center font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-teal-600">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
