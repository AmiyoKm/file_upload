import { z } from "zod";

export const registerSchema = z.object({
    username : z.string().min(3 , {message : 'Username must be atleast 3 characters long'}).max(255 , {message : 'Username must be atmost 255 characters long'}),
    email : z.string().email({message : 'Invalid email address'}),
    password : z.string().min(6 , {message : 'Password must be atleast 6 characters long'}).max(255 , {message : 'Password must be atmost 255 characters long'}),
})

export const loginSchema = z.object({
    email : z.string().email({message : 'Invalid email address'}),
    password : z.string().min(6 , {message : 'Password must be atleast 6 characters long'}).max(255 , {message : 'Password must be atmost 255 characters long'}),
})
// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const uploadSchema = z.object({
    caption : z.string().min(3 , {message : 'Caption must be atleast 3 characters long'}).max(255 , {message : 'Caption must be atmost 255 characters long'}),
    image: z
    .any()
    //  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    //  .refine(
    //    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //    "Only .jpg, .jpeg, .png and .webp formats are supported."
    //  )
     
,
    description : z.string().max(255 , {message : 'Description must be atmost 255 characters long'}),   
})