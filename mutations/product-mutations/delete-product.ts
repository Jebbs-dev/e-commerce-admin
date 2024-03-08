import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export const useDeleteProduct = () => {
  const params = useParams();
  const router = useRouter();

  

  return useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `/api/${params.storeId}/products/${params.productId}`
      );
      return response.data;
    },
    onSuccess: () => {
      router.push(`/${params.storeId}/products`);
      router.refresh();
    },
  });
};
