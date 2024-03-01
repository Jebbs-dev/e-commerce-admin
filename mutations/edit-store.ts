import { SettingsFormValues } from "@/app/(dashboard)/[storeId]/(routes)/settings/components/settings-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";


export const useEditStore = () =>  {

  const params = useParams();
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: SettingsFormValues) => {
      const response = await axios.patch(`/api/stores/${params.storeId}`, values);
      return response.data;
    },
    onSuccess: () => {
      router.refresh();
    },
  })
}