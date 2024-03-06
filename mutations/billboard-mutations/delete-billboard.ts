import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export const useDeleteBillboard = () => {
  const params = useParams();
  const router = useRouter();

  

  return useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );
      return response.data;
    },
    onSuccess: () => {
      router.push(`/${params.storeId}/billboards`);
      router.refresh();
    },
  });
};
