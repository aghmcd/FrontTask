export class taskService {
    static async getAllTask() {
        try {
            const response = await fetch('http://localhost:3720/task')
            const data = response.json()
            return data 
        } catch (err) {
            console.err('Error Obteniendo las Taeras', err.message)
        }
    }
}