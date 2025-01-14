import { Route, Routes } from "react-router"
import Register from "./pages/Register"
import Login from "./pages/Login"
import LandingPage from "./pages/LandingPage"
import Home from "./pages/Home"
import Upload from "./pages/Upload"
import ProtectedRoute from "./utils/ProtectedRoute"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute>
          <Upload />
        </ProtectedRoute>} />

      </Routes>
      
      
    </div>
  )
}

export default App