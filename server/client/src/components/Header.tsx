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
                                    src="https://github.com/shadcn.png"
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