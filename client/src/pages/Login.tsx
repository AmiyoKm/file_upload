import LoginForm from "@/components/LoginForm"

import { BackgroundLines } from "@/components/ui/background-lines"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { loginSchema } from "@/types/zodSchema"
import { login } from "@/utils/API"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { z } from "zod"


const Login = () => {
  const navigate = useNavigate()
    const {toast} = useToast()
    const form = useForm<z.infer <typeof loginSchema>>({
        resolver : zodResolver(loginSchema),
        defaultValues : {
            email : '',
            password : ''
        }
    })
   const { mutate : loginMutate , isPending} = useMutation({
        mutationKey : ['login'],
        mutationFn : login,
        onSuccess : ()=> {
           navigate('/home')
        },
        onError : (error)=> {
            toast({
                variant : 'destructive',
                title : 'Error',
                // @ts-ignore
                description : error.response?.data.error || 'An error occurred'
            })
}})
    const onSubmit = ( data : z.infer<typeof loginSchema>)=>{
      
        loginMutate(data)
        
    }
  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
    <h1 className={cn("md:text-4xl text-xl text-black font-semibold relative z-20 mb-4")}>
      Login
    </h1>
    <LoginForm form={form} onSubmit={onSubmit} isPending={isPending} />

    <h1 className={cn("md:text-l text-md text-black relative z-20 mt-4")}>
      Don't have an account? <Link to="/register" className="text-blue-500">register</Link>
    </h1>
    </BackgroundLines>
  </div>
  )
}

export default Login