"use client";
import { updateUserData } from "@/apis/actions/settingsActions/updateUserData";
import { updateUserPass } from "@/apis/actions/settingsActions/updateUserPass";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { updateUserDataSchema } from "@/schemas/updateUserDataSchema";
import { updateUserPassSchema } from "@/schemas/updateUserPass";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaFloppyDisk, FaLock, FaUser } from "react-icons/fa6";
import * as zod from "zod";

export interface UpdateProfileData {
  name: string;
  email: string;
  phone: string;
}

export default function SettingsPage() {
  const userData = useSession();
  const [isPassShown, setIsPassShown] = useState(false);
  const { control: userDataControl, handleSubmit: handleUserDataSubmit } =
    useForm<zod.infer<typeof updateUserDataSchema>>({
      defaultValues: {
        name: "",
        email: "",
        phone: "",
      },
      resolver: zodResolver(updateUserDataSchema),
    });

  async function onUpdateUserDataSubmit(
    data: zod.infer<typeof updateUserDataSchema>,
  ) {
    console.log(data);
    const response = await updateUserData(data);
    if (response.message === "success") {
      toast.add({
        type: "success",
        description: "Profile updated successfully",
      });
    } else {
      toast.add({ type: "error", description: "Failed to update profile" });
    }
  }

  const { control: userPassControl, handleSubmit: handleUserPassSubmit } =
    useForm<zod.infer<typeof updateUserPassSchema>>({
      defaultValues: {
        currentPassword: "",
        password: "",
        rePassword: "",
      },
      resolver: zodResolver(updateUserPassSchema),
    });

  async function onUpdateUserPassSubmit(
    data: zod.infer<typeof updateUserPassSchema>,
  ) {
    console.log(data);
    const response = await updateUserPass(data);
    if (response.message === "success") {
      toast.add({ type: "success", description: "Password updated successfully" });
    } else {
      toast.add({ type: "error", description: "Failed to update password" });
    }
  }

  return (
    <main className="flex-1 min-w-0">
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
          <p className="text-gray-500 text-sm mt-1">
            Update your profile information and change your password
          </p>
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                <FaUser className="text-2xl text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Profile Information</h3>
                <p className="text-sm text-gray-500">
                  Update your personal details
                </p>
              </div>
            </div>
            <form
              onSubmit={handleUserDataSubmit(onUpdateUserDataSubmit)}
              className="space-y-5"
            >
              <div>
                <Controller
                  name="name"
                  control={userDataControl}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="block text-sm font-medium text-gray-700 mb-2 ms-2"
                        htmlFor={field.name}
                      >
                        Full Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your name"
                        type="text"
                        autoComplete="off"
                        className="focus-visible:ring-green-200 focus-visible:ring-2 focus-visible:border-green-300 py-5  w-full px-4 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                        defaultValue={userData?.data?.user.name}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="email"
                  control={userDataControl}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="block text-sm font-medium text-gray-700 mb-2 ms-2"
                        htmlFor={field.name}
                      >
                        Email Address
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your email"
                        type="email"
                        autoComplete="off"
                        className="focus-visible:ring-green-200 focus-visible:ring-2 focus-visible:border-green-300 py-5  w-full px-4 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                        defaultValue={userData?.data?.user.email}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="phone"
                  control={userDataControl}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="block text-sm font-medium text-gray-700 mb-2 ms-2"
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
                        className="focus-visible:ring-green-200 focus-visible:ring-2 focus-visible:border-green-300 py-5  w-full px-4 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 shadow-lg shadow-green-600/25 cursor-pointer"
                >
                  <FaFloppyDisk />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          <div className="p-6 sm:p-8 bg-gray-50">
            <h3 className="font-bold text-gray-900 mb-4">
              Account Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">User ID</span>
                <span className="font-mono text-gray-700">
                  {userData?.data?.user.id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Role</span>
                <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 font-medium capitalize">
                  user
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
                <FaLock className="text-2xl text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Change Password</h3>
                <p className="text-sm text-gray-500">
                  Update your account password
                </p>
              </div>
            </div>
            <form onSubmit={handleUserPassSubmit(onUpdateUserPassSubmit)} className="space-y-5">
              <div>
                <div className="relative">
                  <Controller
                    name="currentPassword"
                    control={userPassControl}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          className="block text-sm font-medium text-gray-700 ms-2"
                          htmlFor={field.name}
                        >
                          Current Password
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your current password"
                          type={isPassShown ? "text" : "password"}
                          autoComplete="off"
                          className="focus-visible:ring-green-200 focus-visible:ring-2 focus-visible:border-green-300 py-5  w-full px-4 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setIsPassShown(!isPassShown)}
                    className="absolute right-4 top-2/3 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <FaEye />
                  </button>
                </div>
              </div>
              <div>
                <div className="relative">
                  <Controller
                    name="password"
                    control={userPassControl}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          className="block text-sm font-medium text-gray-700 ms-2"
                          htmlFor={field.name}
                        >
                          New Password
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your new password"
                          type={isPassShown ? "text" : "password"}
                          autoComplete="off"
                          className="focus-visible:ring-green-200 focus-visible:ring-2 focus-visible:border-green-300 py-5  w-full px-4 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setIsPassShown(!isPassShown)}
                    className="absolute right-4 top-2/3 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <FaEye />
                  </button>
                </div>
              </div>
              <div>
                <div className="relative">
                  <Controller
                    name="rePassword"
                    control={userPassControl}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          className="block text-sm font-medium text-gray-700 ms-2"
                          htmlFor={field.name}
                        >
                          Confirm New Password
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Confirm your new password"
                          type={isPassShown ? "text" : "password"}
                          autoComplete="off"
                          className="focus-visible:ring-green-200 focus-visible:ring-2 focus-visible:border-green-300 py-5  w-full px-4 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setIsPassShown(!isPassShown)}
                    className="absolute right-4 top-2/3 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <FaEye />
                  </button>
                </div>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 shadow-lg shadow-amber-600/25 cursor-pointer"
                >
                  <FaLock />
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
