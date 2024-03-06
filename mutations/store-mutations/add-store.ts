"use client"

import * as z from "zod";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { formSchema } from "@/components/modals/store-modal";

export const useCreateStore = () => {

  return useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await axios.post("/api/stores/", values);
      return response.data;

    },
    onSuccess: (data) => {
      window.location.assign(`/${data.id}`);
    },
  });
};
