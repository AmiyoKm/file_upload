
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ImageApiResponse } from "@/types/imageApiResponse";

interface HomePaginationProps {
  data : ImageApiResponse | null
  page : number
  setPage : React.Dispatch<React.SetStateAction<number>>
}
const HomePagination = ({ data , page , setPage }: HomePaginationProps ) => {
  
  return (
    <div className="flex flex-col justify-center items-center p-4 bg-white shadow-md rounded-lg">
      {data && 
        <div className="w-full max-w-2xl">
          <div className="mb-4 text-center">
            <p className="text-gray-700 font-semibold">
              Showing page {data.currentPage} of {data.totalPages}
            </p>
          </div>
          {data.totalPages > 1 && 
            <Pagination>
              <PaginationContent className="flex justify-center space-x-2">
                {
                  data.currentPage === 1 ?  null :
                  <PaginationPrevious onClick={()=>{setPage(page-1)}} className="px-3 py-1 border rounded-md hover:bg-gray-200 cursor-pointer">
                  <PaginationLink   >
                    Previous
                  </PaginationLink>
                </PaginationPrevious> 
                }
                {
                    data.totalPages >= 1 && 
                    
                        Array.from({ length: data.totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink onClick={()=>{setPage(i+1)}}  className={`cursor-pointer px-3 py-1 border rounded-md ${data.currentPage === i + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                    
                        
                    
                {
                  data.currentPage===data.totalPages ? null : 
                  <PaginationNext onClick={()=>{ setPage(page+1)}} className="px-3 py-1 border rounded-md hover:bg-gray-200 cursor-pointer">
                  <PaginationLink >
                    Next
                  </PaginationLink>
                </PaginationNext> 
                }
              </PaginationContent>
            </Pagination>
                }
        </div>
          }
      
    </div>
  );
};

export default HomePagination;
