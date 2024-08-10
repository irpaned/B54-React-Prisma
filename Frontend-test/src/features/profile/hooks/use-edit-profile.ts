import { api } from '../../../libraries/api'
import { EditProfileForm } from '../types/edit-profile'
import { EditProfileSchema } from '../validators/edit-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

export const useEditProfileForm = () => {
  
    const { 
        register, 
        handleSubmit, 
        formState : {errors} } 
        = useForm<EditProfileForm>({
          mode : 'onChange',
          resolver : zodResolver(EditProfileSchema)
      })
  
      const onSubmit: SubmitHandler<EditProfileForm> = async (data) => {
        try {      
            const response = await api.patch("/user/:id", data)
            console.log("response", response.data);
      
          } catch (error) {
            console.log(error);
            
          }
    
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit
  }

}







// // import React, { useState } from 'react'
// import { api } from '../../../libraries/api'
// import { EditProfileForm } from '../types/register-form'
// // import { useToast } from '@chakra-ui/react'
// // import { useDispatch } from 'react-redux'
// // import { useNavigate } from 'react-router-dom'
// import { EditProfileSchema } from '../validators/edit-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { SubmitHandler, useForm } from 'react-hook-form'


// export const useEditProfileForm = () => {
  
//     // const toast = useToast()
//     // const dispatch = useDispatch()
//     // const navigate = useNavigate()
  
//     // const [form, setForm] = useState<EditProfileForm>({
//     //   userName : "",
//     //   fullName : "",
//     //   bio : "",
  
//     // });
  
//     const { 
//         register, 
//         handleSubmit, 
//         formState : {errors} } 
//         = useForm<EditProfileForm>({
//           mode : 'onChange',
//           resolver : zodResolver(EditProfileSchema)
//       })
  
    
//       const onSubmit: SubmitHandler<EditProfileForm> = async (data) => {
//         try {      
//             const response = await api.patch("/user/:id", data)
//             console.log("response", response.data);
      
//             // const token = response.data.token
            
//             // cara bacanya apabila betulan token maka akan dimasukkan ke localstorage kita 1:21:05 day 8
//             // if(token) {
//             //   localStorage.setItem("token", token)
//             // }
      
//           } catch (error) {
//             console.log(error);
            
//           }
    
//   };

//   return {
//     register,
//     handleSubmit,
//     errors,
//     onSubmit
//   }

// }