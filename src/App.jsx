import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import NotFound from './vendorDashboard/components/NotFound'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route path="/*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </>
  );
}

export default App