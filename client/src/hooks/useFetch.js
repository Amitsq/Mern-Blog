// import { useEffect, useState } from "react"

// export const useFetch = (url, option = {}, dependencies = [], config ={}) => {
//   const {paginated = false, limit = 6}= config;

//     const [data, setData] = useState()
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState()

//     //for pagination
//     const [page, setPage]= useState(1)
//     const [hasMore, setHasMore] = useState(true)


//    useEffect(() => {
//     const fetchData = async (pageNumber = 1) => {
//       setLoading(true);
//       try {

//         let fetchUrl = url

//         if(paginated){
//           const separator = fetchUrl.includes("?") ? "&":"?";
//           fetchUrl = `${fetchUrl}${separator}page=${pageNumber}&limit=${limit}`
//         }


//         const response = await fetch(fetchUrl, option);
//         const responseData = await response.json();

//         if (!response.ok) {
//           throw new Error(`Error: ${response.status} ${response.statusText}`);
//         }

//         if(paginated){
//           if(responseData.blog && responseData.blog.length>0){
//             if(pageNumber ===1){
//               setData(responseData.blog) // first page --> replace
//             }else{
//               setData((prev) => [...prev, ...responseData.blog]) // next page append
//             }
//             setPage(pageNumber+1)
//           }else{
//             setHasMore(false)
//           }
//         }else{
//             setData(responseData); //for non-paginated request
//             setError();
//           }




        
        
//       } catch (err) {
//         setError(err.message);
//         setHasMore(false)
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData(1);
//   }, dependencies);

//     return {data,loading,error,fetchData, hasMore,page}

// }



import { useEffect, useState } from "react";

export const useFetch = (url, option = {}, dependencies = [], config = {}) => {
  const { paginated = false, limit = 6 } = config;

  const [data, setData] = useState();
  const [initialLoading, setInitialLoading] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // for pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // ✅ define fetchData OUTSIDE so it can be returned
  const fetchData = async (pageNumber = page) => {
     if (pageNumber === 1) {
    setInitialLoading(true); // first page loading
  } else {
    setLoading(true); // next-page loading
  }
    
    
    try {
      let fetchUrl = url;

      if (paginated) {
        const separator = fetchUrl.includes("?") ? "&" : "?"; 
        fetchUrl = `${fetchUrl}${separator}page=${pageNumber}&limit=${limit}`;
      }

      const response = await fetch(fetchUrl, option);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      if (paginated) {
        if (responseData.blog && responseData.blog.length > 0) {
          if (pageNumber === 1) {
            setData(responseData.blog); // first page --> replace
          } else {
            setData((prev) => [...prev, ...responseData.blog]); // next page append
          }
          setPage(pageNumber + 1);

          //check if more page is available
          if(responseData.currentPage >= responseData.totalPage){
            setHasMore(false)
          }

        } else {
          setHasMore(false);
        }
      } else {
        setData(responseData); // for non-paginated request
        setError();
      }
    } catch (err) {
      setError(err.message);
      setHasMore(false);
    } finally {
      setInitialLoading(false)
      setLoading(false);
    }
  };

  // run initially
  useEffect(() => {
    fetchData(1);
  }, dependencies);

  return { data, initialLoading,loading, error, fetchData, hasMore, page };
};
