import React from 'react'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserProfileEdit from './components/UserProfileEdit'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} /> 
        <Route path='' element={<PrivateRoute/>} >  
          <Route path='/profile' element={<HomePage/>} />
          <Route path='/profileupdate' element={<UserProfileEdit />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
