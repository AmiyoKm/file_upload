
import {  Navigate } from "react-router"
import Cookie from "js-cookie"
const ProtectedRoute = ({children} : {children : JSX.Element}) => {
    
    const accessToken = Cookie.get("accessToken")
   
   if (!accessToken) {
    return <Navigate to="/login" replace />;
}

  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute