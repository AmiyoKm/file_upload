
import Glance from "../assets/Glance.png";
import { FaSignInAlt } from "react-icons/fa";
import { MdQuestionMark } from "react-icons/md";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router";

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <header className="h-20 flex justify-between w-full px-4 py-2 fixed top-0 bg-gray-800 shadow-md text-white">
                <div className="flex items-center hover:text-blue-400 cursor-pointer transition-colors duration-300">
                    <MdQuestionMark className="mr-2" />
                    About
                </div>
                <div className="flex justify-center ml-[10.5rem]">
                    <img src={Glance} alt="Glance Logo" className="h-full rounded-lg" />
                </div>
                <div className="flex items-center">
                    <div
                        className="mr-4 flex items-center hover:text-blue-400 cursor-pointer transition-colors duration-300"
                        onClick={() => navigate("/login")}
                    >
                        <FaSignInAlt className="mr-2" />
                        Sign In
                    </div>
                    <div>
                        <Link to="/register">
                            <Button className="hover:bg-blue-500 hover:text-white transition-colors duration-300">
                                Create Account
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>
            <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-6xl font-extrabold mb-4">Welcome to Glance</h1>
                <p className="text-xl mb-8">
                    A simple and easy way to manage your tasks
                </p>
                <Button
                    className="mt-4 h-16 px-8 py-4 text-lg hover:bg-blue-500 hover:text-white transition-colors duration-300"
                    onClick={() => navigate("/register")}
                >
                    Start Uploading
                </Button>
            </main>
            <footer className="py-4 bg-gray-800 w-full text-center">
                <p className="text-sm">
                    Made with ❤️ by{" "}
                    <a
                        href="https://www.facebook.com/omi.kumar.7503/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:underline"
                    >
                        Amiyo Kumar
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;
