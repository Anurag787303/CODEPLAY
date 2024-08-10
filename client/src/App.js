import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Problems from './Components/Problems'
import Problem from './Components/Problem'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Problems />} />
        <Route path="/problem/:id" element={<Problem />} />
      </Routes>
    </div>
  )
}

export default App