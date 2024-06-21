import { useQuery } from '@tanstack/react-query';
import { ThreadProfileEntity } from '../features/home/entities/thread-profile-entity';
import { api } from "../libraries/api";

export const useProfilePage = () => {

    // 👇 Menggunakan TanStack query (TanStack query untuk get data step 1)
    const { data : threads } = useQuery<ThreadProfileEntity[]>({
        queryKey : ["threads"], 
        queryFn : getThreads})
        
    
        // 👇 (TanStack query untuk get data step 2)
      async function getThreads(userId : any) {
        const response = await api.get(`/api/threads/:id${userId}`, {
          headers : {
            Authorization : `Bearer ${localStorage.token}`
          }
        })
        return response.data
      }

      

    
    const BoxCSS = {
      border: "1px solid rgb(47, 51, 54)",
      borderTop: "none",
      borderRight: "none",
      borderLeft: "none",
      p: "20px 15px 20px 15px"
    }
    
    const ButtonPost = {
      bg: "brand.900",
      color: "white",
      borderRadius: 30,
      p: "0px 20px 1px 20px",
      ":hover" : {
        bg: "white",
        color : "black"
      }
     
    
      // const BoxCSS = {
      //   // border: "1px solid rgb(47, 51, 54)",
      //   // borderTop: "none",
      //   // borderRight: "none",
      //   // borderLeft: "none",
      //   p: "20px 15px 20px 15px"
      // }
    
    }

    return {
        threads,
        BoxCSS,
        ButtonPost
    }
} 