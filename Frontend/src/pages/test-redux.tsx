import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button } from "@chakra-ui/button";
import React from "react";
import { SET_USER } from "../redux/slices/auth";
import { Box, Image, Text } from "@chakra-ui/react";


export function TestRedux() {
    const currentUser = useSelector((state : RootState) => state.auth.user);
    console.log(currentUser);

    // const dispatch = useDispatch()

    // async function onLogin() {

    //     dispatch(SET_USER({
    //         bio : "hello word",
    //         email : "irfan@gmail.com",
    //         fullName : "Muhammad Irfan",
    //         photoProfile : "https://images.pexels.com/photos/17992626/pexels-photo-17992626/free-photo-of-alam-kepala-tanduk-cula.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    //         userName : "irpaned"
    //     }))
    // }
    
    return (
        <>
        <Box color={"white"}>
            <Text>Email: {currentUser.email}</Text>
            <Text>Bio: {currentUser.bio}</Text>
            <Text>Full Name: {currentUser.fullName}</Text>
            <Text>User Name: {currentUser.userName}</Text>
            <Image src={currentUser.photoProfile} w="100px" h="100px"></Image>
        </Box>
        </>
        
    )
        
    
}