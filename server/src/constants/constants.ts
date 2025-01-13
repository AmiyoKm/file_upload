const getEnv = (key : string , defaultValue? : string)=> {
    const values = process.env[key];

    if(values === undefined){
        if(defaultValue){
            return defaultValue
        }
        throw new Error(`Environment variable ${key} is not set`);
    }
    return values;
}
export const MONGO_URI = getEnv("MONGO_URI"); 



export const JWT_SECRET = getEnv("JWT_SECRET");
export const CLOUDINARY_NAME = getEnv("CLOUDINARY_NAME");
export const CLOUDINARY_API_KEY = getEnv("CLOUDINARY_API_KEY");
export const CLOUDINARY_API_SECRET = getEnv("CLOUDINARY_API_SECRET");
export const REFRESH_JWT_SECRET = getEnv("REFRESH_JWT_SECRET");