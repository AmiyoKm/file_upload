import Header from "@/components/Header";
import UploadForm from "@/components/UploadForm";
import { useToast } from "@/hooks/use-toast";
import { uploadSchema } from "@/types/zodSchema";
import { upload } from "@/utils/API";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const Upload = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      caption: "",
      image: null,
      description: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["upload"],
    mutationFn: upload,
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Image uploaded successfully",
        description: "Your image has been uploaded successfully",
      });
      form.reset();
      navigate("/home");
    },
    onError: (error: AxiosError) => {
      console.log(error.response);
      toast({
        variant: "destructive",
        title: "Error while uploading image",
        // @ts-ignore
        description: error.response?.data.error || "An error occurred",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof uploadSchema>) => {
    const formData = new FormData();
    formData.append("caption", data.caption);
    formData.append("description", data.description);
    if (data.image) {
      formData.append("image", data.image[0]);
    }
    // @ts-ignore
    mutate(formData);

  };
  return (
    <div>
      <main className="min-h-screen bg-gray-100">
        {/* Header Section */}
        <Header />
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-4xl font-bold mb-10">Upload Image</h1>

          <div>
            <UploadForm isPending={isPending} form={form} onSubmit={onSubmit} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;
