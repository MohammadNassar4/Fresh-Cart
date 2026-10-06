"use client";
import { addToWishlist } from "@/apis/actions/wishlistActions/addToWishlist";
import { toast } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function AddToWishlistBTN({
  prodId,
  cls,
  child,
}: {
  prodId: string;
  cls: string;
  child: React.ReactNode;
}) {
  const queryClient = useQueryClient();

  const { mutate: handleAddToWishlist } = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Product added to wishList successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["getWishlist"] });
    },
    onError: () => {
      toast.add({
        type: "error",
        description: "Please Login first",
      });
    },
  });

  return (
    <button onClick={() => handleAddToWishlist(prodId)} className={cls}>
      {child}
    </button>
  );
}
