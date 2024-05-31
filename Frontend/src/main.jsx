import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router} from 'react-router-dom'
import { theme } from './libraries/chakra-theme'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
        <ChakraProvider theme={theme}>
          <App/>
        </ChakraProvider> 
      </Router>
  </React.StrictMode>
)







// state management

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <TransactionProvider>
//       <Router>
//         <ChakraProvider>
        
//           <App/>
          
//         </ChakraProvider> 
//       </Router>
//     </TransactionProvider>
//   </React.StrictMode>
// )
