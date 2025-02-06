import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import LoginForm from './Components/Login/LoginForm'
import Tareas from './Components/Tareas/Tareas'

function App() {
  //html principal App
  return (
    <>
     <div className='container'>
      <div className='data'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginForm />} />
            <Route path='/tareas' element={<Tareas />} />
          </Routes>
        </BrowserRouter>
      </div>
     </div>
    </>
  )
}

export default App
