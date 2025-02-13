export class usuarioService{
    static async crearUsuario(usuario){
        const urlAPI = 'http://localhost:3720/usuario'
        const response = await fetch(urlAPI, {
            method: 'POST',
            body: usuario
        });
        const data = await response.json();
        return data;
    }
}