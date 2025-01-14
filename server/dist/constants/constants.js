import dotenv from 'dotenv'
dotenv.config({path:'./.env'});

const getEnv = (key, defaultValue) => {
    const value = process.env[key];
    if (value === undefined) {
        if (defaultValue) {
            return defaultValue;
        }
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
};

export const MONGO_URI = getEnv("MONGO_URI");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const CLOUDINARY_NAME = getEnv("CLOUDINARY_NAME");
export const CLOUDINARY_API_KEY = getEnv("CLOUDINARY_API_KEY");
export const CLOUDINARY_API_SECRET = getEnv("CLOUDINARY_API_SECRET");
export const REFRESH_JWT_SECRET = getEnv("REFRESH_JWT_SECRET");