export class docsService{
    static async subirDoc(documento){
        const urlAPI = 'http://localhost:3720/documento'
        const response = await fetch(urlAPI, {
            method: 'POST',
            body: documento
        });
        const data = await response.json();
        return data;
    }
}