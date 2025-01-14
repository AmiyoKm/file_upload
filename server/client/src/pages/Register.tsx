import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/types/zodSchema";
import { cn } from "@/lib/utils";
import RegisterForm from "@/components/RegisterForm";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/utils/API";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { Link } from "react-router";
import { BackgroundLines } from "@/components/ui/background-lines";

const Register = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutate: registerMutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: () => {
      console.log("success");
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: "Error",
        // @ts-ignore
        description: error.response?.data.error || "An error occurred",
      });
    },
  });
  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    console.log(data);
    registerMutate(data);
    form.reset();
  };
  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
        
        <RegisterForm form={form} onSubmit={onSubmit} isPending={isPending} />

        <h1 className={cn("md:text-l text-md  relative z-20 mt-4 text-black")}>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </h1>
      </BackgroundLines>
    </div>
  );
};

export default Register;
