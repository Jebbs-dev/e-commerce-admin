"use client"

import * as z from "zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { formSchema } from "@/components/modals/store-modal";

export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await axios.post("/api/stores/", values);
      return response.data;

    },
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ["stores"] });
      window.location.assign(`/${data.id}`);
    },
  });
};
