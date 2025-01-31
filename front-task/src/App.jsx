import { useEffect, useState } from 'react'
import './App.css'
import { taskService } from './Services/tasks/taskService'
import Tareas from './Components/Tareas/Tareas'
import NuevaTarea from './Components/Tareas/NuevaTarea'

function App() {
  
  const [contenedorNT, setContenerdorNT] = useState(false)
  const [allTask, setAllTask] = useState([])

  const fetchData = async () => {
    try {
      const tareas = await taskService.getAllTask();
      setAllTask(tareas)
    } catch (err) {
      console.error('Error al obtener tareas: ', err.message)
    }
  }
   
  useEffect(() => {
    fetchData()
  },[])

  const onClicNuevaTarea = () => {
    setContenerdorNT(true)
  }

  const onGuardarTarea = async (tarea) => {
    console.log(tarea)
    try {
      const resultado = await taskService.addNewTask(tarea)
      console.log(resultado)
      fetchData()
      setContenerdorNT(false)
    } catch (err) {
      console.error('Error al crear la tarea', err. message)
    }
  }
  
  //html principal App
  return (
    <>
     <div className='container'>
      <div className='data'>
        <h1>Bienvenido a mi Página</h1>
        <div className={contenedorNT ? 'compTarea' : 'contenedorP'}>
          <Tareas tasks = {allTask}/>
        </div>
        <div className={contenedorNT ? 'containerNT' : 'containerNTD'}>
          <NuevaTarea onGuardarTarea={onGuardarTarea} />
        </div>
        <div className={!contenedorNT ? 'contenedorBotones' : 'contenedorBotonesD' }>
          <button className='butonNuevaTarea' onClick={(e) => {
            e.preventDefault()
            onClicNuevaTarea()
            }}
          >Nueva Tarea</button>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
