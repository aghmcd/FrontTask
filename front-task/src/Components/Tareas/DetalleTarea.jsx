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
                    tareaD.notas.map((subArray, index) => (
                        subArray.map((nota, subIndex) => (
                            <li key={`${index}-${subIndex}`}>
                                <p>Nota: {nota.nota}</p>
                                <p>Fecha: {nota.fecha_nota}</p>
                            </li>
                        ))
                    ))
                ) : (
                    <p>No hay notas disponibles.</p>
                )}
            </ol>
            </div>        
        </>
    )

}

export default DetalleTarea