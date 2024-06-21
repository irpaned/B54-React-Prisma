import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ThreadEntity } from '../features/home/entities/thread-entity';
import { CreateThreadDTO } from '../features/home/types/thread';
import { createThreadSchemaZod } from '../features/home/validators/thread-schema';
import { api } from "../libraries/api";

export const useHomePage = () => {

    
    // 👇 Menggunakan TanStack query (TanStack query untuk get data step 1)
    const { data : threads, refetch } = useQuery<ThreadEntity[]>({
        queryKey : ["threads"], 
        queryFn : getThreads})
    
        // 👇 (TanStack query untuk get data step 2)
      async function getThreads() {
        const response = await api.get("/threads", {
          headers : {
            Authorization : `Bearer ${localStorage.token}`
          }
        })
        return response.data
      }
    
      // Menggunakan react hook form unutk bagian posting
      const { register, handleSubmit } 
      = useForm<CreateThreadDTO>({
        mode : 'onSubmit',
        resolver: zodResolver(createThreadSchemaZod)
    })
    
    
    
    // 👇 Menggunakan TanStack query (TanStack query  untuk post data step 1)
    // karena kita ingin menggunakan post maka pakai useMutation
    const { mutateAsync } = useMutation<
    ThreadEntity, 
    AxiosError, 
    CreateThreadDTO>({
      mutationFn: (newThread) => {
          const formData = new FormData();
          formData.append("content", newThread.content);
          formData.append("image", newThread.image[0]);
          console.log(newThread);
          return api.post("/threads", formData, {
              headers : {
                  Authorization : `Bearer ${localStorage.token}`
              }
          })
      }
    })
    //   setelah setting di atas ini jangan lupa register pada inputnya, contohnya ada file 1.cardtsx (TanStack query  untuk post data step 2)
    
    // ini untuk pasang di bagian form nya beserta handleSubmit (TanStack query untuk post data step 3)
    const onSubmit: SubmitHandler<CreateThreadDTO> = async (data) => {
     try {
      await mutateAsync(data)
      refetch()
     } catch (error) {
      console.log(error);
     }
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
        ButtonPost,
        onSubmit,
        register,
        handleSubmit
    }
} 