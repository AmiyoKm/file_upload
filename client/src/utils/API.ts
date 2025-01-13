import { loginSchema, registerSchema, uploadSchema } from "@/types/zodSchema";
import { z } from "zod";
import API from "./axiosConfig";

export const register = async ( data : z.infer<typeof registerSchema> ) => (
    await API.post("api/user/register" , data)
)

export const login = async ( data : z.infer<typeof loginSchema> ) => (
    await API.post("api/user/login" , data)
)

export const upload = async ( data : z.infer<typeof uploadSchema> ) => (
    await API.post("api/uploads" , data)
)