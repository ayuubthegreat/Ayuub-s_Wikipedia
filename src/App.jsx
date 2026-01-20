import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from '../pages/home'
import { Loading_Prop, Navbar } from '../components/navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Projects } from '../pages/projects'
import { Login } from '../pages/login'
import { ProtectedRoute } from '../components/protectedRoute.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { checkForUserInfo } from '../store/slices/auth.js'
import { About } from '../pages/about.jsx'

function App() {
  const [count, setCount] = useState(0)
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token") && user === null) {
      dispatch(checkForUserInfo());
    }
  }, [user, dispatch]);

  return (
    <>
    
    <BrowserRouter>
    
    <Navbar />
    <Loading_Prop />
    <Routes>
      <Route path="/" element={<ProtectedRoute children={<Home/>} requiresAuthentication={false}></ProtectedRoute>}></Route>
      <Route path="/projects" element={<ProtectedRoute children={<Projects/>} requiresAuthentication={false}></ProtectedRoute>}></Route>
      <Route path='/portal' element={<ProtectedRoute children={<Login/>} requiresAuthentication={false}></ProtectedRoute>}></Route>
      <Route path='/register' element={<ProtectedRoute children={<Login loginBool={false}/>} requiresAuthentication={false}></ProtectedRoute>}></Route>
      <Route path='/about' element={<ProtectedRoute children={<About/>} requiresAuthentication={false}></ProtectedRoute>}></Route>
      <Route path="*" element={<h1>404 - Page Not Found</h1>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )}

export default App
