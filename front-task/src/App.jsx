import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import LoginForm from './Components/Login/LoginForm'
import Tareas from './Components/Tareas/Tareas'
import { AuthProvider } from './Components/AuthContext'
import  RutaProtegida  from './Components/RutaProtegida'
import Menu from './Components/Menu/Menu'
import CrearPerfil from './Components/Profile/CrearPerfil'

function App() {

  //html principal App
  return (
    <>
     <div className='container'>
      <div className='data'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginForm />} />
            <Route path='/new_profile' element={<CrearPerfil />}/>
            <Route path='/menu' element={<RutaProtegida><Menu /></RutaProtegida>} />
          </Routes>
         </BrowserRouter>
        </AuthProvider>
      </div>
     </div>
    </>
  )
}

export default App
