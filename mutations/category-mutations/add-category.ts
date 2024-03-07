import { CategoryFormValues } from "@/app/(dashboard)/[storeId]/(routes)/categories/[categoryId]/components/category-form";
import { useMutation } from "@tanstack/react-query"
import axios from "axios";
import { useParams, useRouter } from "next/navigation";


export const useCreateCategory = () => {

  const params = useParams();
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: CategoryFormValues) => {
      const response = await axios.post(`/api/${params.storeId}/categories`, values);
      return response.data;
    },
    onSuccess: () => {
      router.push(`/${params.storeId}/categories`);
      router.refresh();
    },
  })
}