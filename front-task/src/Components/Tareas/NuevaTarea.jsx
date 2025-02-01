import { useState } from 'react'
import './NuevaTarea.css'

const NuevaTarea = ({onGuardarTarea}) => {
  const [form, setForm] = useState({
    tarea: '',
    fechaInicio: '',
    progreso: 'sin iniciar',
    prioridad: 'baja',
    notas: {nota: ''},
    comentarios: {comentario:''}
  })
  
  const onHandleChange = (e) => {
    const {name, value} = e.target
    // Verifica si la clave es anidada (tiene un .)
    if(name.includes(".")) {
      const [parentKey, childKey] = name.split(".") // diveide notas.nota en notas y nota
      setForm((prevForm) => ({
        ...prevForm,
        [parentKey]: {
          ...prevForm[parentKey], // copia las claves existentes dentro de "notas" o comentarios
          [childKey]: value, // actualiza solo la clave anidada
        },
      }))
    } else {
      // actualiza las claves normales
      setForm({...form,[name]:value})
    }
    
  }
  
  const onHandlesubmit = (e) => {
    e.preventDefault()
    onGuardarTarea(form)
  }

  return (
        <>
          <div>
             <h1>Nueva Tarea</h1>
             <div>
              <form onSubmit={onHandlesubmit}>
                <label htmlFor="tarea">Tarea:</label>
                <input
                  type="text"
                  name="tarea"
                  value={form.tarea}
                  onChange={onHandleChange}
                  maxLength={57}
                  required
                />
                <label htmlFor="fechai">Fecha Inicio:</label>
                <input
                  type="date"
                  name="fechaInicio"
                  value={form.fechaInicio}
                  onChange={onHandleChange}
                  required
                />
                <fieldset>
                  <legend>Prioridad</legend>
                  <label htmlFor="prioridad">
                    <input
                      type="radio"
                      name="prioridad"
                      value='alta'
                      onChange={onHandleChange}
                      checked={form.prioridad === "alta"}
                    /> Alta
                  </label>
                  
                  <label htmlFor="prioridad">
                    <input
                      type="radio"
                      name="prioridad"
                      value='media'
                      onChange={onHandleChange}
                      checked={form.prioridad === 'media'}
                    /> Media
                  </label>
                  <label htmlFor="prioridad">
                    <input
                      type="radio"
                      name="prioridad"
                      value='baja'
                      onChange={onHandleChange}
                      checked={form.prioridad === 'baja'}
                    /> Baja
                  </label>
                </fieldset>
                <label htmlFor="nota">Nota:</label>
                <textarea
                  name="notas.nota"
                  rows={3}
                  value={form.notas.nota}
                  onChange={onHandleChange}
                  required
                ></textarea>
                <label htmlFor="comentario">Comentario:</label>
                <textarea
                  name="comentarios.comentario"
                  rows={3}
                  value={form.comentarios.comentario}
                  onChange={onHandleChange}
                  required
                ></textarea>
                <button className='botonGuardarT '>Guardar</button>
              </form>
             </div>
          </div>     
        </>
    )
}

export default NuevaTarea