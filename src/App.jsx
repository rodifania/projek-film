import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
