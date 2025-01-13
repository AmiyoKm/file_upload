import { Route, Routes } from "react-router"
import Register from "./pages/Register"
import Login from "./pages/Login"
import LandingPage from "./pages/LandingPage"
import Home from "./pages/Home"
import Upload from "./pages/Upload"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<Upload />} />

      </Routes>
      
      
    </div>
  )
}

export default App