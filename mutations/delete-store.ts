import { SettingsFormValues } from "@/app/(dashboard)/[storeId]/(routes)/settings/components/settings-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export const useDeleteStore = () => {
  const params = useParams();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`/api/stores/${params.storeId}`);
      return response.data;
    },
    onSuccess: () => {
      router.refresh();
      router.push("/");
    },
  });
};
