import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import { useAuthStore } from './stores/useAuthStore'

const App = () => {

  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <div>
      <Routes>
        <Route path='/' element={!user ? <Login /> : <Navigate to='/home'/>} />
        <Route path='/home' element={user ? <Home /> : <Navigate to='/'/>} />
      </Routes>
    </div>
  )
}

export default App