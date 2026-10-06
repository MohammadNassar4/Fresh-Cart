"use client";
import { deleteAddress } from "@/apis/actions/addressesActions/deleteAddress";
import { AddressType } from "@/apis/types/addressType";
import AddAddressDialog from "@/app/_components/AddAddressDialog/AddAddressDialog";
import { toast } from "@/components/ui/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FaCity,
  FaLocationDot,
  FaPen,
  FaPhone,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";

export default function AddressesPage() {
  const queryClient = useQueryClient();
  const { data: addresses, isLoading } = useQuery({
    queryKey: ["getUserAddresses"],
    queryFn: async () => {
      const response = await fetch(`/api/addresses`);
      if (!response.ok) throw new Error("Failed to fetch addresses");
      const payload = await response.json();
      return payload.data;
    },
  });

  const { mutate: handleDeleteAddress } = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Address deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["getUserAddresses"] });
    },
    onError: () => {
      toast.add({ type: "error", description: "Failed to delete address" });
    },
  });

  const emptyAddresses = (
    <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
        <FaLocationDot className="text-3xl text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">No Addresses Yet</h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        Add your first delivery address to make checkout faster and easier.
      </p>
      <AddAddressDialog cls="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25 cursor-pointer">
        <FaPlus />
        Add Your First Address
      </AddAddressDialog>
    </div>
  );

  return (
    <main className="flex-1 min-w-0">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage your saved delivery addresses
            </p>
          </div>
          <AddAddressDialog cls="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25 cursor-pointer">
            <FaPlus />
            Add Address
          </AddAddressDialog>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-gray-200" />
                <div className="flex-1">
                  <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-full bg-gray-100 rounded mb-3" />
                  <div className="h-3 w-24 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-gray-200" />
                <div className="flex-1">
                  <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-full bg-gray-100 rounded mb-3" />
                  <div className="h-3 w-24 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
          </div>
        ) : addresses?.length === 0 ? (
          emptyAddresses
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses?.map((address: AddressType) => (
              <div
                key={address._id}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-green-100 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                      <FaLocationDot className="text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 mb-1">
                        {address.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {address.details}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <FaPhone className="text-xs" />
                          {address.phone}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FaCity className="text-xs" />
                          {address.city}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 flex items-center justify-center transition-colors cursor-pointer">
                      <FaPen />
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address._id)}
                      className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer"
                      title="Delete address"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
