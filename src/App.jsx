import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from '../pages/home'
import { Navbar } from '../components/navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Projects } from '../pages/projects'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/projects" element={<Projects/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
