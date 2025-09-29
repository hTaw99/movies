import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login } from './store/slices/authSlice'
import './App.css'
import Login from './components/login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import MovieDetails from './components/MovieDetails/MovieDetails'
import Favorites from './components/Favorites/Favorites'

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)

  
    const authStatus = localStorage.getItem('isAuthenticated') === 'true'
    if (authStatus) {
      dispatch(login())
    }

  return (
    <Router>
      <Routes>
        <Route path='/' element={isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : <Login />
          } 
        />
        <Route path='/login' element={isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : <Login />
          } 
        />
        <Route path='/home' element={isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : <Login />
          } 
        />
        <Route path='/dashboard' element={isAuthenticated ? 
            <Dashboard /> : <Navigate to="/login" replace />
          } 
        />
        <Route path='/movie/:id' element={isAuthenticated ? 
            <MovieDetails /> : <Navigate to="/login" replace />
          } 
        />
        <Route path='/favorites' element={isAuthenticated ? 
            <Favorites /> : <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </Router>
  )
}

export default App