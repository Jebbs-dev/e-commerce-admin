import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export const useDeleteColor = () => {
  const params = useParams();
  const router = useRouter();

  

  return useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `/api/${params.storeId}/colors/${params.colorId}`
      );
      return response.data;
    },
    onSuccess: () => {
      router.push(`/${params.storeId}/colors`);
      router.refresh();
    },
  });
};