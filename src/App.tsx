import React from "react"
// import RootLayout from "./layouts/RootLayout"
import { Card, Flex } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import { CardBeranda } from "./pages/1.card"
import { RightBar } from "./pages/3.right-bar"
import Home from "./layouts/RootLayout"

function App() {  
  return (
        <Routes>
          <Route path="/home" element={<Home/>}/> 
        </Routes>
  )
}

export default App
