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

  return (
    <div>
      <main className="min-h-screen bg-gray-100 flex justify-between  flex-col "> 
       
        <Header />

       {
          data ? <>
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

       
        <section className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 ">
          {data?.images.map((post) => (
           
              <DirectionAwareHover  key={post._id} className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl cursor-pointer transition-shadow duration-300" imageUrl={post.url}>
                <div className="flex w-80 justify-between items-center">
                  <div>
                    <p className="font-bold text-xl">{post.caption}</p>
                    <p className="font-normal text-sm">{post.description}</p>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <IoIosHeart className="text-red-500 text-2xl" />
                  </div>
                </div>
              </DirectionAwareHover>
      
          ))}
        </section>
        <div>
          <HomePagination data={data}  page={page}  setPage={setPage}/>
        </div>
          </> : 
            <div className="flex flex-col items-center justify-center h-full py-20">
              <IoIosHeart className="text-gray-400 text-6xl mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">No images posted yet</h2>
              <p className="text-gray-500 mb-6">Please post some images to share your moments with the community.</p>
              <Link to="/upload">
              <Button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
                Upload New Photo
              </Button>
              </Link>
            </div>

       }
        

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
