"use client";

import { addToCart } from "@/apis/actions/cartActions/addToCart";
import { toast } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function AddToCatBTN({
  cls,
  child,
  prodId,
}: {
  cls: string;
  child: React.ReactNode;
  prodId: string;
  }) {
  const queryClient = useQueryClient();
  async function handleAddToCart() {
    mutate(prodId);
  }

  const { mutate } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Product added successfully to your cart",
      });
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
    },
    onError: () => {
      toast.add({ type: "error", description: "Please Login first" });
    },
  });

  return (
    <button className={cls} onClick={handleAddToCart}>
      {child}
    </button>
  );
}
