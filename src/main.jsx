import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router} from 'react-router-dom'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <ChakraProvider>
    
      <App/>
      
    </ChakraProvider> 
    </Router>
  </React.StrictMode>
)
