import { useMutation, useQuery } from '@tanstack/react-query';
import { UserEntity } from '../features/home/entities/user-entity';
import { api } from '../libraries/api';
import { EditProfileForm } from '../features/profile/types/edit-profile';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditProfileSchema } from '../features/profile/validators/edit-form';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useEffect } from 'react';


export const EditProfile = () => {

        const currentUser = useSelector((state : RootState) => state.auth.user);

        const { data : user, refetch } = useQuery<UserEntity[]>({
            queryKey : ["user"], 
            queryFn : getUser})
        
        async function getUser() {
            const response = await api.get(`/user/${currentUser.id}`)
                return response.data
        }

        useEffect(() => {
            getUser();
          }, []);

    console.log(currentUser);
    

    const { register, handleSubmit, formState : {errors} } 
        = useForm<EditProfileForm>({
          mode : 'onSubmit',
          resolver : zodResolver(EditProfileSchema)
      })

    const { mutateAsync } = useMutation<
    UserEntity, 
    AxiosError, 
    EditProfileForm>({
      mutationFn: (newUser) => {
          const formData = new FormData();
          formData.append("fullName", newUser.fullName);
          formData.append("userName", newUser.userName);
          formData.append("bio", newUser.userName);
          console.log(newUser);

          return api.patch(`/user/${currentUser.id}`, formData)
      }
    })

    const onSubmit: SubmitHandler<EditProfileForm> = async (data) => {
        try {
         await mutateAsync(data)
         refetch()
        } catch (error) {
         console.log(error);
        }
       }
       console.log(onSubmit);
       

       return {
        user,
        onSubmit,
        register,
        handleSubmit,
        errors
    }

}