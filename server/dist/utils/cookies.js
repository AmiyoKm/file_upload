import { thirtyDaysFromNow } from "./time.js";
const secure = process.env.NODE_ENV !== "development";
const defaults = {
    sameSite: "strict",
    httpOnly: true,
    secure: secure
};
export const getAccessTokenCookieOptions = () => ({
    ...defaults,
    expires: thirtyDaysFromNow()
});
export const setAuthCookie = ({ res, accessToken, refreshToken }) => {
    return res.cookie("accessToken", accessToken, getAccessTokenCookieOptions()).cookie("refreshToken", refreshToken, getAccessTokenCookieOptions());
};
export const clearAuthCookie = (res) => {
    return res.clearCookie("accessToken", defaults).clearCookie("refreshToken", defaults);
};
