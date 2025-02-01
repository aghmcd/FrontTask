const DetalleTarea = ({ tareaD }) => {

    // Comprueba si tareaD tiene contenido antes de intentar acceder a sus propiedades
    if (!tareaD || Object.keys(tareaD).length === 0) {
        return <p>Seleccione una tarea para ver los detalles.</p>;
    }

    return (
        <>
            <div>
               <p>Tarea: {tareaD.tarea}</p>
               <p>Notas:</p>
               <ol>
                {tareaD.notas && tareaD.notas.length > 0 ? (
                    tareaD.notas.map((aUno) => (
                        aUno.map((nota) => (
                            <li key={nota._id}>
                                <p>Nota: {nota.nota}</p>
                                <p>Fecha: {nota.fecha_nota.split("T")[0]}</p>
                            </li>
                        ))
                    ))
                ) : (
                    <p>No hay notas para esta tarea</p>
                )}
            </ol>
            <p>Comentarios:</p>
            <ol>
                {tareaD.comentarios && tareaD.comentarios.length > 0 ? (
                    tareaD.comentarios.map((aUno)=> (
                        aUno.map((coment) => (
                            <li key={coment._id}>
                                <p>Comentario: {coment.comentario}</p>
                                <p>Fecha: {coment.fecha_coment.split("T")[0]}</p>
                            </li>
                        ))
                    ))
                ) : (
                    <p>No hay comentarios para esta tarea</p>
                )}
            </ol>
            </div>        
        </>
    )

}

export default DetalleTarea