
import { ColorFormValues } from "@/app/(dashboard)/[storeId]/(routes)/colors/[colorId]/components/color-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export const useEditColor = () => {
  const params = useParams();
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: ColorFormValues) => {
      const response = await axios.patch(
        `/api/${params.storeId}/colors/${params.colorId}`,
        values
      );
      return response.data;
    },
    onSuccess: () => {
      router.push(`/${params.storeId}/colors`);
      router.refresh();
    },
  });
};
