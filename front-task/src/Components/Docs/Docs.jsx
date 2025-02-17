import { useEffect, useRef, useState } from "react";
import Menu from "../Menu/Menu"
import { docsService } from "../../Services/docs/docs";

const Docs = () => {
    const [formDocs, setFormDocs] = useState({
        rubro: ''
    });
    const fileInputRef = useRef(null);
    const [doc, setDoc] = useState(null);

    const [idUsuario, setIdUsuario] = useState(null);

    useEffect(() => {
        setIdUsuario(localStorage.getItem('idU'));
    }, []);

    const onhandlerChange = (e) => {
        const {name, value} = e.target;
        setFormDocs({...formDocs, [name]: value});
    }

    const onHandlerFile = (e) => {
        const file = e.target.files[0];
        setDoc(file);
    }

    const onHandlerDocs = async (e) => {
        e.preventDefault();
        const nuevoDoc = new FormData();
        nuevoDoc.append('rubro', formDocs.rubro);
        nuevoDoc.append('idUsuario', idUsuario);
        if(doc){
            nuevoDoc.append('archivo', doc);
        }
        const respuesta = await docsService.subirDoc(nuevoDoc)
        console.log(respuesta)
    }  

    return (
        <>
            <div>
                <div>
                    <Menu />
                </div>
                <form onSubmit={onHandlerDocs}>
                    <label htmlFor="rubro">Rubro</label>
                    <input type="text"
                      id="rubro"
                      name="rubro" 
                      value={formDocs.rubro}
                      onChange={onhandlerChange}
                      required
                    />
                    <label htmlFor="archivo">Archivo</label>
                    <input type="file" 
                      name="archivo" 
                      id="archivo" 
                      ref={fileInputRef}
                      onChange={onHandlerFile}
                      required  
                    />
                    <button>Gurdar</button>
                </form>
            </div>
        </>
    )
}

export default Docs