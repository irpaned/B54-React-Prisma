import React, { useState } from "react"
// import RootLayout from "./layouts/RootLayout"
import { Box, Card, Flex } from "@chakra-ui/react"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { CardBeranda } from "./pages/1.card"
import { RightBar } from "./pages/3.right-bar"
import Home from "./layouts/RootLayout"
import Profile from "./layouts/RootProfile"
import { Dashboard } from "./pages/5.dashboard"
import { Login } from "./pages/6.login"
import { Test } from "./pages/test-api"
import { CreateAccount } from "./pages/7.create-account"

function App() { 

  // ------ INI BERHUBUNGAN DENGAN PRIVATE ROUTE ---------
  const [isLogin, setIsLogin] = useState<boolean>(false)
  
  const PrivateRoute = () => {
    if(isLogin) return <Outlet/>

    return <Navigate to={"/login"}/>
  }
  // ------ INI BERHUBUNGAN DENGAN PRIVATE ROUTE ---------

  return (
    
        <Routes>
          <Route path="/home" element={<Home/>}/> 
          <Route path="/profile" element={<Profile/>}/> 
          <Route path="/login" element={<Login/>}/>
          <Route path="/test" element={<Test/>}/>
          <Route path="/create" element={<CreateAccount/>}/>

          <Route  element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<Dashboard/>}/> 
          </Route>
        </Routes>
  
        
  )
}

export default App
