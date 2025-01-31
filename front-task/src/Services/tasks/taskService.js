export class taskService {
    static async getAllTask() {
        const apiURL = 'http://localhost:3720/task'
        try {
            const response = await fetch(apiURL)
            return await response.json()
        } catch (err) {
            console.log('Error Abriendo la Base de datos')
            return data
        }
    }

    static async addNewTask(datos) {
        const apiURL = 'http://localhost:3720/task'
        try {
            const response = await fetch(apiURL, {
                method: 'POST', //el metodo HTTP
                headers: {
                    'Content-Type': 'application/json', // tipo de contenido que se envia
                },
                body: JSON.stringify(datos), //convierte el objeto a JSON para enviarlo
            })

            if (!response.ok) {
                throw new Error(`Error al crear la tarea ${response.statusText}`)
            }
            // regresa el JSON de respuesta (validar en el backend que respuesta envia)
            return await response.json()
        } catch (err) {
            console.error('Error al crear la tarea:', err.message)
            throw err // Lanza el error para manejarlo externamente si es necesario
        }
    }

    static async findTaskbyId(id){
        const apiURL = 'http://localhost:3720/task'
        try {
            const response = await fetch(`${apiURL}/${id}`)
            if(!response.ok){
                throw new Error(`Error al buscar tarea ${response.text}`)
            }
            return await response.json()
        } catch (err) {
            console.error('Error al Buscar la tarea:', err.message)
        }
    }
}