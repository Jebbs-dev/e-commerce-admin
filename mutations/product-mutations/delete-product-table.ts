import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export const useDeleteProductTable = () => {
  const params = useParams();
  const router = useRouter();

  return useMutation({
    mutationFn: async (dataId: string) => {
      const response = await axios.delete(
        `/api/${params.storeId}/products/${dataId}`
      );
      return response.data;
    },
    onSuccess: () => {
      router.refresh();
    },
  });
};
