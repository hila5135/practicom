import { useEffect, useState } from "react";
import { ApiClient, Lesson } from "../api/client";
const apiClient = new ApiClient("https://localhost:7129");
function ActionsForUsers() {
   const [allLessons , setAllLessons] = useState<Lesson[]>([]);//for all lecturers
   const [isLoading, setIsLoading] = useState(false);//for loading
   const [isFetched, setIsFetched] = useState(false);//for button
   const fetchAllLessons = async () => {
    setIsLoading(true);
    try{
        const result = await apiClient.lessonAll();
        console.log(result);
        setAllLessons(result);
        setIsFetched(true); 

    }catch(error){
        console.error('error-failed to fetch',error);
    }
    setIsLoading(false);}


return (
<div>
         <button onClick={fetchAllLessons} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Show All Lessons'}
         </button>

         {isFetched && !isLoading && (
            <div>
               <h1>All Lessons</h1>
               <ul>
                  {allLessons.map((lesson, index) => (
                     <li key={index}>{lesson.lessonTitle}</li>
                  ))}
               </ul>
            </div>
         )}
      </div>
      );
}
export default ActionsForUsers;