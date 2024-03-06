import { BillboardFormValues } from "@/app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/components/billboard-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export const useEditBillboard = () => {
  const params = useParams();
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: BillboardFormValues) => {
      const response = await axios.patch(
        `/api/${params.storeId}/billboards/${params.billboardId}`,
        values
      );
      return response.data;
    },
    onSuccess: () => {
      router.push(`/${params.storeId}/billboards`);
      router.refresh();
    },
  });
};
