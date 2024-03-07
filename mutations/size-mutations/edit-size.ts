
import { SizeFormValues } from "@/app/(dashboard)/[storeId]/(routes)/sizes/[sizeId]/components/size-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export const useEditSize = () => {
  const params = useParams();
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: SizeFormValues) => {
      const response = await axios.patch(
        `/api/${params.storeId}/sizes/${params.sizeId}`,
        values
      );
      return response.data;
    },
    onSuccess: () => {
      router.push(`/${params.storeId}/sizes`);
      router.refresh();
    },
  });
};
