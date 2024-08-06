import React from 'react'
import './App.css'
import LandingPage from './vendorDashboard/pages/LandingPage'
import { BrowserRouter,Routes,Route  } from 'react-router-dom'
import NotFound from './vendorDashboard/components/NotFound'
function App() {
  return (
    <>
       <BrowserRouter>
         <Routes>
              <Route path='/' element={<LandingPage/>}></Route>
              <Route path='/*' element={<NotFound/>}></Route>
         </Routes>
       </BrowserRouter>
    </>
  )
}

export default App