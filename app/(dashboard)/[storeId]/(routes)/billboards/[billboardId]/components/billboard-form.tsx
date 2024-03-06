"use client";

import * as z from "zod";

import { useState } from "react";
import { useCreateBillboard } from "@/mutations/billboard-mutations/add-billboard"; 
import { useEditBillboard } from "@/mutations/billboard-mutations/edit-billboard";
import { useDeleteBillboard } from "@/mutations/billboard-mutations/delete-billboard";

import { Billboard } from "@prisma/client";

import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import ImageUpload from "@/components/ui/image-upload";

interface BillboardFormProps {
  initialData: Billboard | null;
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

export type BillboardFormValues = z.infer<typeof formSchema>;

const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {


  const { mutateAsync: createBillboard } = useCreateBillboard();
  const { mutateAsync: editBillboard, isPending } = useEditBillboard();
  const { mutateAsync: deleteBillboard } = useDeleteBillboard();

  const [open, setOpen] = useState(false);

  const title = initialData ? "Edit Billboard" : "Create Billboard";
  const description = initialData ? "Edit a Billboard" : "Add a new Billboard";
  const toastMessage = initialData ? "Billboard updated" : "Billboard created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: BillboardFormValues) => {
    try {
      if(initialData){
        await editBillboard(values);
        
      } else {
        await createBillboard(values);
      }
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const onDelete = async () => {
    try {
      await deleteBillboard();
      toast.success("Billboard deleted!");
    } catch (error) {
      toast.error("Make sure you remove all categories using this billboard first.");
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isPending}
            variant="destructive"
            size="icon"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={isPending}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Billboard Label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      
    </>
  );
};

export default BillboardForm;
