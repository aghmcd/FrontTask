import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const dbMongo = async() => {
    const response = await fetch('http://localhost:3720/task')
    const data = await response.json()
    console.log(data)
    return data
  }

  const data = [
    {
      _id: 1,
      task: "ir al mercado",
      prioridad: "media",
      estado: "cerrada",
    },
    {
      _id: 2,
      task: "Limpiar el Baño",
      prioridad: "media",
      estado: "en proceso",
    },
    {
      _id: 3,
      task: "Bañarme",
      prioridad: "media",
      estado: "sin iniciar",
    }
  ]
  const [detalle, setDetalle] = useState(false)
  const [contenedorNT, setContenerdorNT] = useState(false)
  const [botonCerrar, setBotonCerrar] = useState(true)
  const [miTarea, setMiTarea] = useState(null)
  const [botonNT, setBotonNT] = useState(false)
  const [filtro, setFiltro] = useState('todasabiertas')
  const [allTask, setAllTask] = useState(data)
  const [tareas, setTareas] = useState(allTask)
  const [taskAPI, setTaskAPI] = useState([])
  
    
  useEffect(() => {
    if(filtro === 'todasabiertas') {
      const dataFiltrada = allTask.filter(t => t.estado !== 'cerrada')
      setTareas(dataFiltrada)
    } else {
        const dataFiltrada = allTask.filter(t => t.estado === filtro)
        setTareas(dataFiltrada)
    }

    const fetchData = async () => {
      const taskAPI = await dbMongo()
      setTaskAPI(taskAPI)
    }

    fetchData();

  },[filtro, allTask])

  const Tabla = ({task}) => {
    
    const onHandleMiTarea = (id) => {
      setDetalle(true)
      setBotonCerrar(false)
      setBotonNT(true)
      setContenerdorNT(false)
      const tarea = tareas.find(t => t._id === id)
      setMiTarea(tarea)
    }

    const onHandleCerrarDetalle = () => {
      setDetalle(false)
      setBotonCerrar(true)
      setBotonNT(false)
    }

    const onHandleNT = () => {
      setContenerdorNT(true)
      setBotonNT(false)
    }
    
    return (
      <>
        <div className='containerTareas'>
          <h2>Tabla de Tareas</h2>
          <div className='botonesRadio'>
            <div>
              <input
                type="radio" 
                name="todasabiertas"
                id="todasabiertas"
                checked={filtro === 'todasabiertas'}
                value='todasabiertas'
                onChange={(e) => setFiltro(e.target.value)}/>
              <label className="labelBR" htmlFor="todasabiertas">Todas Abiertas</label>
            </div>
            <div>
              <input
                type="radio"
                name="sininiciar"
                id="sininiciar"
                checked={filtro === 'sin iniciar'}
                value='sin iniciar'
                onChange={(e) => setFiltro(e.target.value)}/>
              <label className="labelBR" htmlFor="sininiciar">Sin Iniciar</label>
            </div>
            <div>
              <input
                type="radio"
                name="enproceso"
                id="enproceso"
                checked={filtro === 'en proceso'}
                value='en proceso'
                onChange={(e) => setFiltro(e.target.value)}/>
              <label className="labelBR" htmlFor="enproceso">En Proceso</label>
            </div>
            <div>
              <input
                type="radio"
                name="cerradas"
                id='cerradas'
                checked={filtro === 'cerrada'}
                value='cerrada'
                onChange={(e) => setFiltro(e.target.value)}
                />
              <label className="labelBR" htmlFor="cerradas">Cerradas</label>
            </div>
          </div>
          <div>
            <ol>
              {task && task.map((item) => ( 
                 <li key={item._id}>
                   <a href='#' 
                       onClick={(e) => {
                        e.preventDefault() 
                        onHandleMiTarea(item._id)
                       }}>
                     {item.task}
                   </a>
                 </li>
               ))}
            </ol>
          </div>
          <div className='botonera'>
            <button
              className={botonCerrar ? 'estiloBotonD' : 'estiloBoton'}
              disabled={botonCerrar}
              onClick={onHandleCerrarDetalle}
            >
              Cerrar detalle
            </button>
            <button
              className={botonNT ? 'estiloBotoD' : 'estiloBoton'}
              disabled={botonNT}
              onClick={onHandleNT}
            >
              Nueva Tarea
            </button>
          </div>
        </div>
      </>
    )
  }

  const Detalle = ({miTarea}) => {
    // const { miTarea } = prop
    const { _id, task, prioridad, estado } = miTarea || {}

    const onHandleEstado = (item) => {
      setAllTask((prevTask) => {
        return prevTask.map((t) => {
          if(t._id === item._id) {
            let nuevoEstado
            if (t.estado === 'sin iniciar'){
              nuevoEstado = 'en proceso'
            } else if (t.estado === 'en proceso'){
              nuevoEstado = 'cerrada'
            } else {
              nuevoEstado = 'sin iniciar'
            }
            return {...t, estado: nuevoEstado}
          }
          setDetalle(false)
          setBotonCerrar(true)
          setBotonNT(false)
          return t
        })
      })
    }

    
    return (
      <>
        <div>
          <h2>Detalle de la Tarea</h2>
          <span className='item'>
            <strong>
              <p>ID:</p>
            </strong>
            <p className='itemP'>{ _id }</p>
            <strong>
              <p>Tarea:</p>
            </strong>
            <p className='itemP'>{ task }</p>
            <strong>
              <p>Prioridad:</p>
            </strong>
            <p className='itemP'>{ prioridad }</p>
            <strong>
              <p>Tarea:</p>
            </strong>
            <p className='itemP'>{ estado }</p>
            <strong>
              <p>Cambiar Estado</p>
            </strong>
            <button
              className='estiloBoton botonEstado'
              onClick={(e) => {
                e.preventDefault
                onHandleEstado(miTarea)
              }}
              >{estado}</button>
          </span>
        </div>
      </>
    )
  }

  const NuevaTarea = () => {
    const [form, setForm] = useState({
      _id: 0,
      task: '',
      prioridad: '',
      estado: ''
    })

    const onHandleChange = (e) => {
      const { name, value } = e.target
      setForm({...form, [name]:value})
    }

    const onHandleSubirTask = (e) => {
      e.preventDefault()
      const lastId = allTask.length > 0 ? allTask[allTask.length - 1]._id : 0
      const newTask = {
        ...form,
        _id: lastId + 1,
        estado: 'sin iniciar'
      }
      setAllTask(prev => [...prev, newTask])
      setContenerdorNT(false)
      setBotonNT(false)
    }

    return (
      <>
        <div className='nuevaTarea'>
          <h1>Nueva Tarea</h1>
          <div>
            <form className='tablaForm' onSubmit={onHandleSubirTask}>
              <div>
                <label htmlFor="task">Tarea</label>
                <input type="text"
                  id='task'
                  name='task'
                  value={form.task}
                  onChange={onHandleChange}
                />
              </div>
              <div>
                <label htmlFor="prioridad">Prioridad</label>
                <select
                  name="prioridad"
                  id="prioridad"
                  onChange={onHandleChange}>
                    <option value="">--Por favor selecciones una opcion--</option>
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
                  </select>
              </div>
              <button className='estiloBoton'>Guardar</button>
            </form>
          </div>
        </div>
        
      </>
    )
  }
  //html principal App
  return (
    <>
     <div className='container'>
      <div className='data'>
        <h1>Bienvenido a mi Página</h1>
        <Tabla task={tareas}/>
      </div>
      <div className={detalle ? 'detalle' : 'detallehide' }>
        <Detalle miTarea={miTarea}/>
      </div>
      <div className={contenedorNT ? 'containerNT' : 'containerNTD'}>
        <NuevaTarea />
      </div>
     </div>
    </>
  )
}

export default App
