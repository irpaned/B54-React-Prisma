import React, { useEffect, useState } from "react"
// import RootLayout from "./layouts/RootLayout"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import Home from "./layouts/RootLayout"
import Profile from "./layouts/RootProfile"
import { api } from "./libraries/api"
import { Dashboard } from "./pages/5.dashboard"
import { Login } from "./pages/6.login"
import { Register } from "./pages/7.register"
import { Test } from "./pages/test-api"
import { TestRedux } from "./pages/test-redux"
import { RootState } from "./redux/store"
import { SET_USER } from "./redux/slices/auth"
import { useStatStyles } from "@chakra-ui/react"

function App() { 
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const dispatch = useDispatch()
  // ------ INI BERHUBUNGAN DENGAN PRIVATE ROUTE ---------
  const currentUser = useSelector((state : RootState) => state.auth.user);
  
  const PrivateRoute = () => {
    if(!isLoading) {
      if(currentUser.email) return <Outlet/>

      return <Navigate to={"/auth/login"}/>
    }
    
    
    // ------ INI BERHUBUNGAN DENGAN PRIVATE ROUTE ---------
  }
  

  async function authCheck() {
    try {
      const token = localStorage.token
      const response = await api.post(
        "/auth/check", 
        {},
        {
        headers : {
          Authorization: `Bearer ${token}`
        }
      })

      dispatch(SET_USER(response.data))
      setIsLoading(false)
      console.log("kamu sudah login", response.data); 
    } catch (error) { 
      localStorage.removeItem("token")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.token

    if(token)authCheck()
  }, []);

  return (
    
        <Routes>
          <Route path="/home" element={<Home/>}/> 
          <Route path="/profile" element={<Profile/>}/> 
          <Route path="/auth/login" element={<Login/>}/>
          <Route path="/test" element={<Test/>}/>
          <Route path="/auth/register" element={<Register/>}/>



          <Route  element={<PrivateRoute/>}>
            <Route path="/test-redux" element={<TestRedux/>}/> 
            <Route path="/dashboard" element={<Dashboard/>}/> 
          </Route>
        </Routes>
  
        
  )
}

export default App
