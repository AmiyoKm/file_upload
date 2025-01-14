import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { IoIosHeart } from "react-icons/io";
import Header from "@/components/Header";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getImages } from "../utils/API";
import { ImageApiResponse } from "@/types/imageApiResponse";
import HomePagination from "@/components/HomePagination";

const Home = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ImageApiResponse | null>(null);
  const { data: ImageData, isSuccess } = useQuery({
    queryKey: ["getOwnPic", "page=" + page],
    queryFn: () => getImages(String(page)),
  });
  useEffect(() => {
    if (isSuccess && ImageData) {
      setData(ImageData.data as ImageApiResponse);
    }
  }, [isSuccess, ImageData, page]);
  console.log(data);

  return (
    <div>
      <main className="min-h-screen bg-gray-100">
        {/* Header Section */}
        <Header />

        {/* Hero Section */}
        <section className="bg-blue-500 text-white p-10 text-center">
          <h1 className="text-4xl font-bold">
            Welcome back, {data ? data.user.username : null}!
          </h1>
          <p className="mt-4">Ready to share your latest moments?</p>
          <Link to="/upload">
            <Button className="mt-6 bg-white text-blue-500 font-semibold py-2 px-4 rounded">
              Upload New Photo
            </Button>
          </Link>
        </section>

        {/* Feed Section */}
        <section className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-9">
          {data?.images.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl cursor-pointer transition-shadow duration-300"
            >
              <DirectionAwareHover className="rounded-t-lg" imageUrl={post.url}>
                <div className="flex w-72 justify-between items-center">
                  <div>
                    <p className="font-bold text-xl">{post.caption}</p>
                    <p className="font-normal text-sm">{post.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IoIosHeart className="text-red-500 text-2xl" />
                    {/* <span>{post.likes}</span> */}
                  </div>
                </div>
              </DirectionAwareHover>
            </div>
          ))}
        </section>
        <div>
          <HomePagination data={data}  page={page}  setPage={setPage}/>
        </div>

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
