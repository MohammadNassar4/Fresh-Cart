"use client";
import Image from "next/image";
import loginBanner from "../../../assets/images/login-banner.png";
import {
  FaClock,
  FaEnvelope,
  FaEye,
  FaFacebook,
  FaLock,
  FaStar,
  FaTruck,
  FaUsers,
} from "react-icons/fa";
import { FaGoogle, FaShieldHalved } from "react-icons/fa6";
import Link from "next/link";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/loginSchema";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/toast";
import { signIn } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [isPassShown, setIsPassShown] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<zod.infer<typeof LoginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  async function submitForm(data: zod.infer<typeof LoginSchema>) {
    const isLoggedIn = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (isLoggedIn?.ok) {
      toast.add({ type: "success", description: "Logged in successfully" });
      router.refresh()
      router.push("/");
    } else {
      toast.add({ type: "error", description: "Invalid credentials" });
    }
  }

  return (
    <section>
      <div className="container py-16 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="hidden lg:block">
            <div className="text-center space-y-6">
              <Image
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
                src={loginBanner}
                alt="fresh vegetables and fruits shopping cart illustration, modern clean style, green theme"
              />
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  FreshCart - Your One-Stop Shop for Fresh Products
                </h2>
                <p className="text-lg text-gray-600">
                  Join thousands of happy customers who trust FreshCart for
                  their daily grocery needs
                </p>
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FaTruck className="text-green-600 text-lg mr-2" />
                    Free Delivery
                  </div>
                  <div className="flex items-center">
                    <FaShieldHalved className="text-green-600 text-lg mr-2" />
                    Secure Payment
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-green-600 text-lg mr-2" />
                    24/7 Support
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-green-600">
                    Fresh<span className="text-gray-800">Cart</span>
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome Back!
                </h1>
                <p className="text-gray-600">
                  Sign in to continue your fresh shopping experience
                </p>
              </div>
              <div className="space-y-3 mb-6">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 cursor-pointer"
                >
                  <FaGoogle className="text-red-500 text-xl mr-2" />
                  <span className="font-medium text-gray-700">
                    Continue with Google
                  </span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 cursor-pointer"
                >
                  <FaFacebook className="text-blue-600 text-xl mr-2" />
                  <span className="font-medium text-gray-700">
                    Continue with Facebook
                  </span>
                </button>
              </div>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    OR CONTINUE WITH EMAIL
                  </span>
                </div>
              </div>
              <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
                <FieldGroup className="border-b pb-4">
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
                        <div className="relative">
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter your email"
                            autoComplete="off"
                            type="email"
                            className="focus-visible:ring-green-200 focus-visible:ring-2 focus-visible:border-green-300 py-5 pl-9 rounded-md"
                          />
                          <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                        </div>
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
                        <div className="relative">
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter your password"
                            autoComplete="off"
                            type={isPassShown ? "text" : "password"}
                            className="focus-visible:ring-green-200 focus-visible:ring-2 focus-visible:border-green-300 py-5 pl-9 rounded-md"
                          />
                          <FaLock className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                          <FaEye
                            className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 cursor-pointer hover:text-gray-500"
                            onClick={() => setIsPassShown(!isPassShown)}
                          />
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Field orientation="horizontal">
                    <Checkbox id="terms-checkbox" name="terms-checkbox" />
                    <Label htmlFor="terms-checkbox">Keep me signed in</Label>
                  </Field>
                  <Field orientation="horizontal">
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      className={`bg-green-600 rounded-lg w-full p-5.5 font-semibold text-white text-md hover:bg-green-700 cursor-pointer`}
                    >
                      Sign In
                      {isSubmitting && <Spinner />}
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
              <div className="text-center mt-8 pt-6 border-t border-gray-100">
                <p className="text-gray-600">
                  New to FreshCart?
                  <Link
                    className="text-green-600 hover:text-green-700 ms-2 font-semibold cursor-pointer"
                    href="/register"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
              <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
                <div className="flex items-center">
                  <FaLock className="mr-1" />
                  SSL Secured
                </div>
                <div className="flex items-center">
                  <FaUsers className="mr-1 text-lg" />
                  50K+ Users
                </div>
                <div className="flex items-center">
                  <FaStar className="mr-1" />
                  4.9 Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
