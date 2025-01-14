import { uploadSchema } from "@/types/zodSchema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { BackgroundGradient } from "./ui/background-gradient";

interface UploadFormProps {
  form: UseFormReturn<{
    caption: string;
    description: string;
    image?: any;
  }>;
  onSubmit: (data: z.infer<typeof uploadSchema>) => void;
  isPending : boolean
}
const UploadForm = ({ form, onSubmit ,isPending }: UploadFormProps) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
   const handleImageChange = ( e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0]
    if(file){
        const reader = new FileReader()
        reader.onloadend =()=> {
            setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }
   }
  return (
    <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          method="post"
          encType="multipart/form-data"
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="caption" className="text-lg font-semibold">Caption</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your caption"
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel htmlFor="image" className="text-lg font-semibold">Upload file</FormLabel>
                <FormDescription className="text-sm text-gray-500">
                  Or drag and drop your image here
                </FormDescription>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png, image/webp"
                    onChange={(e) => {
                      handleImageChange(e);
                      onChange(e.target.files);
                    }}
                    {...rest}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500">
                  Upload an image (max 5MB, formats: jpg, jpeg, png, webp).
                </FormDescription>
                <FormMessage />
                {imagePreview && 
                <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 rounded-md max-w-40 h-auto object-cover"
                />
                }
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description" className="text-lg font-semibold">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your description"
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full py-3 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {isPending ? 'Uploading...' : 'Upload'}
          </Button>
        </form>
      </Form>
    </BackgroundGradient>
  );
};

export default UploadForm;
