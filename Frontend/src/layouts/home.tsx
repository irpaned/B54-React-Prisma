import { Box, Flex } from "@chakra-ui/react"
import React from "react"
import { CardBeranda } from "../pages/1.card"
import { LeftBar } from "../pages/2.left-bar"
import { RightBar } from "../pages/3.right-bar"


export default function Home() {


  return (
    

      <Flex >
          <LeftBar/> 
          <CardBeranda/>
          <RightBar/>
      </Flex>

    
     
  )
}


// state management
// const state = useContext(TransactionContext);

//   console.log("transaction", state?.transactions)

//   useEffect(() => {
//     state?.AddNewTransaction({
//       id: 123,
//       name: "Irfan",
//       price: 123,
//       qty: 123
//     });
//   }, []);

//   {JSON.stringify(state?.transactions)}