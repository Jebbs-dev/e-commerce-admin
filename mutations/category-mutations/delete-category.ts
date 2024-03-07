import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export const useDeleteCategory = () => {
  const params = useParams();
  const router = useRouter();

  

  return useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );
      return response.data;
    },
    onSuccess: () => {
      router.push(`/${params.storeId}/categories`);
      router.refresh();
    },
  });
};