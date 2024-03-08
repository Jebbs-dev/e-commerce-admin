import { ProductFormValues } from "@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/product-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";


export const useCreateProduct = () =>  {

  const params = useParams();
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: ProductFormValues) => {
      const response = await axios.post(`/api/${params.storeId}/products`, values);
      return response.data;
    },
    onSuccess: () => {
      router.push(`/${params.storeId}/products`);
      router.refresh();
    },
  })
}