import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Problems from './Components/Problems'
import Problem from './Components/Problem'
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'
import Profile from './Components/Profile'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problem/:id" element={<Problem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App