export class loginService {
    static async loginProcess(login){
        const apiURL = "http://localhost:3720/auth";
        try {
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login)
            });
            if(!response.ok){
                throw new Error(`Error la realizar login ${response.statusText}`);
            }

            return await response.json();
        } catch (err) {
            console.error('Error en el fetch', err.message);
        }
    }
}