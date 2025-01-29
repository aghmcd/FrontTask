import './Tareas.css'
const Tareas = ({tasks}) => {

    const onClicNuevaTarea = () => {
        console.log('Hola')
    }

    return(
        <>
         <div className="contenedorP">
            <h1 className='titulo1'>Cosas por hacer</h1>
            {tasks.map((item) => (
                <div className='itemsT' key={item._id}>
                    <div className={item.progreso !== 'Cerrado' ? 'item' : 'itemC'}>
                     <span >
                      <strong className='camposT'>Tarea:</strong>
                      <p className='contenidoT'>{item.tarea}</p>
                      <strong className='camposT'>Prioridad: </strong>
                      <p className='contenidoT'>{item.prioridad}</p>
                      <strong className='camposT'>Estado: </strong>
                      <p className='contenidoT'>{item.progreso}</p>
                      <strong className='camposT'>Fecha de Inicio: </strong>
                      <p className='contenidoT'>{item.fechaInicio}</p>
                      <button>Notas</button><button>Estado</button>
                     </span> 
                    </div>
                </div>
            ))}
            <div className='contenedorBotones'>
              <button className='butonNuevaTarea' onClick={(e) => {
                e.preventDefault()
                onClicNuevaTarea()
              }}
                >Nueva Tarea</button>
            </div>
            
         </div>
        </>
    )
}

export default Tareas