import { useEffect, useState } from 'react'
import DetalleTarea from './DetalleTarea'
import './Tareas.css'
import { taskService } from '../../Services/tasks/taskService'

const Tareas = ({ tasks }) => {

    const [tareaDetalle, setTareaDetalle] = useState([{}])

    useEffect(() => {
        if (!tareaDetalle) {
            console.log("La tarea se ha actualizado", tareaDetalle)
        }
    }, [tareaDetalle]);
    
    const onHanddleDetail = async (id) => {
        try {
            const response = await taskService.findTaskbyId(id)
            console.log(response)
            setTareaDetalle(response[0])
        } catch (err) {
            console.error(err)
        }
    }

    
    return(
        <>
         <div className="contenedorP">
            <h1 className='titulo1'>Tareas por hacer</h1>
            <div className='itemsT'>
                {tasks.map((item) => (
                    <div key={item._id}
                        className={item.progreso !== 'cerrado' 
                            ? item.progreso === 'sin iniciar' ? 'itemR' : 'itemG'
                            : 'itemC'}>
                        <span >
                            <strong className='camposT'>Tarea:</strong>
                            <p className='contenidoT'>{item.tarea}</p>
                            <strong className='camposT'>Prioridad: </strong>
                            <p className='contenidoT'>{item.prioridad}</p>
                            {/* <strong className='camposT'>Estado: </strong>
                            <p className='contenidoT'>{item.progreso}</p>
                            <strong className='camposT'>Fecha de Inicio: </strong>
                            <p className='contenidoT'>{item.fechaInicio}</p> */}
                            <button onClick={(e) => {
                                e.preventDefault()
                                onHanddleDetail(item._id)
                            }}>Detalle</button><button>Estado</button>
                        </span> 
                    </div>  
                ))}
            </div>
            <div className='detalleDeshabilitado'>
                <DetalleTarea tareaD={tareaDetalle} />
            </div> 
         </div>
        </>
    )
}

export default Tareas