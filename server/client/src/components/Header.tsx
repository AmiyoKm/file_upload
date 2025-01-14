import { Link } from 'react-router'
import Glance from "../assets/Glance.png";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { logout } from '@/utils/API';
const Header = () => {
      
  return (
    <div>
        <header className=" flex justify-between items-center p-5 shadow-md bg-white">
                    <Link to="/home" className="flex items-center">
                        <img className="w-20" src={Glance} alt="Glance Logo" />
                    </Link>
                    <input
                        type="text"
                        placeholder="Search images..."
                        className="border p-2 rounded w-1/3"
                    />
                    <nav className="flex space-x-4 items-center">
                        <Link to="/explore" className="text-gray-700 hover:text-gray-900">
                            Explore
                        </Link>
                        <Link to="/upload" className="text-gray-700 hover:text-gray-900">
                            Upload
                        </Link>
                        <Link to="/profile" className="text-gray-700 hover:text-gray-900">
                            My Profile
                        </Link>
                        <Link
                            to="/notifications"
                            className="text-gray-700 hover:text-gray-900"
                        >
                            Notifications
                        </Link>
                        <Link to="/login" onClick={logout}>
                            <Avatar>
                                <AvatarImage
                                    src="https://plus.unsplash.com/premium_photo-1672201106204-58e9af7a2888?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </Link>
                    </nav>
                </header>
    </div>
  )
}

export default Header