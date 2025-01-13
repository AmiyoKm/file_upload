import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { IoIosHeart } from "react-icons/io";
import Header from "@/components/Header";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";

const userFeed = [
  {
    id: 1,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1734549547925-153584e3b1ac?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Sunset Bliss",
    likes: 10,
    description: "A beautiful sunset over the ocean.",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1735030379333-134693a094f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Mountain Escape",
    likes: 20,
    description: "A serene mountain landscape.",
  },
  {
    id: 3,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1736520566943-78675ec3f42e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "City Lights",
    likes: 30,
    description: "The city skyline at night.",
  },
  {
    id: 4,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1734549547925-153584e3b1ac?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Sunset Bliss",
    likes: 10,
    description: "A beautiful sunset over the ocean.",
  },
  {
    id: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1735030379333-134693a094f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Mountain Escape",
    likes: 20,
    description: "A serene mountain landscape.",
  },
];

const Home = () => {
  return (
    <div>
      <main className="min-h-screen bg-gray-100">
        {/* Header Section */}
        <Header />

        {/* Hero Section */}
        <section className="bg-blue-500 text-white p-10 text-center">
          <h1 className="text-4xl font-bold">Welcome back, [Username]!</h1>
          <p className="mt-4">Ready to share your latest moments?</p>
          <Link to="/upload">
            <Button className="mt-6 bg-white text-blue-500 font-semibold py-2 px-4 rounded">
              Upload New Photo
            </Button>
          </Link>
        </section>

        {/* Feed Section */}
        <section className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-9">
          {userFeed.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl cursor-pointer transition-shadow duration-300"
            >
              <DirectionAwareHover
                className="rounded-t-lg"
                imageUrl={post.imageUrl}
              >
                <div className="flex w-72 justify-between items-center">
                  <div>
                    <p className="font-bold text-xl">{post.caption}</p>
                    <p className="font-normal text-sm">{post.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IoIosHeart className="text-red-500 text-2xl" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </DirectionAwareHover>
            </div>
          ))}
        </section>

        {/* Footer Section */}
        <footer className="text-center py-5 bg-white shadow-inner mt-10">
          <div className="flex justify-center space-x-6 mb-4">
            <Link to="/about" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900">
              Contact
            </Link>
            <Link to="/privacy" className="text-gray-700 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-700 hover:text-gray-900">
              Terms of Service
            </Link>
          </div>
          <p>© 2025 Glance. All Rights Reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
