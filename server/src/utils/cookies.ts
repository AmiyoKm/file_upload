import { CookieOptions, Response } from "express-serve-static-core"
import { thirtyDaysFromNow } from "./time"
type Params ={
    res : Response ,
    accessToken : string,
    refreshToken : string
    
}

const defaults: CookieOptions = {
    sameSite: "strict",
    secure: true // Recommended for HTTPS only
};

export const getAccessTokenCookieOptions = () : CookieOptions=>({
    ...defaults ,
    expires : thirtyDaysFromNow() 
})



export const setAuthCookie = ({res, accessToken , refreshToken} : Params) => {
    return res.cookie("accessToken" , accessToken , getAccessTokenCookieOptions()).cookie("refreshToken" , refreshToken , getAccessTokenCookieOptions())
}

export const clearAuthCookie = (res : Response )=> {
    return res.clearCookie("accessToken" , defaults).clearCookie("refreshToken" , defaults)
}