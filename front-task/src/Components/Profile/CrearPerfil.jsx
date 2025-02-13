import { useState, useRef } from "react";
import { usuarioService } from "../../Services/Usuarios/usuarioService";

const CrearPerfil = () => {

const [profileForm, setProfileForm] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    contrasena: '',
    fechaNacimiento: '',
});

const fileInputRef = useRef(null);
const [avatar, setAvatar] = useState(null)

const onHandleChange = (e) => {
    const {name, value} = e.target;
    setProfileForm({...profileForm, [name]:value});
}

const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
}

const onHandlesubmit = async (e) => {
    e.preventDefault();
    const nuevoUsuario = new FormData();
    nuevoUsuario.append('nombre', profileForm.nombre);
    nuevoUsuario.append('apellidos', profileForm.apellidos);
    nuevoUsuario.append('email', profileForm.email);
    nuevoUsuario.append('contrasena', profileForm.contrasena);
    nuevoUsuario.append('fechaNacimiento', profileForm.fechaNacimiento);
    if(avatar){
        nuevoUsuario.append('avatar', avatar);
    }
    const respuesta = await usuarioService.crearUsuario(nuevoUsuario);
    setProfileForm({
        nombre: '',
        apellidos: '',
        email: '',
        contrasena: '',
        fechaNacimiento: ''
    });
    console.log(respuesta);
    setAvatar(null)
    if (fileInputRef.current) {
        fileInputRef.current.value = null;
    }
}

    return (
        <>
            <h1>Crear Perfil</h1>
            <div>
                <form onSubmit={onHandlesubmit}>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text"
                      id="nombre"
                      name="nombre"
                      value={profileForm.nombre}
                      onChange={onHandleChange}
                      required
                    />
                    <label htmlFor="apellidos">Apellidos</label>
                    <input type="text" 
                     id="apellidos"
                     name="apellidos"
                     value={profileForm.apellidos}
                     onChange={onHandleChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                     id="email"
                     name='email'
                     value={profileForm.email}
                     onChange={onHandleChange}
                     required
                    />
                    <label htmlFor="contrasena">Contraseña</label>
                    <input type="password"
                     id='contrasena'
                     name='contrasena'
                     value={profileForm.contrasena}
                     onChange={onHandleChange}
                     required
                     minLength={8}
                    />
                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                    <input type="date" 
                     id="fechaNaciemiento"
                     name="fechaNacimiento"
                     value={profileForm.fechaNacimiento}
                     onChange={onHandleChange}
                     required
                    />
                    <label htmlFor="avatar">Avatar</label>
                    <input type="file" 
                     id="avatar"
                     name="avatar"
                     accept="image/jpeg, image/png"
                     ref={fileInputRef}
                     onChange={handleFileChange}
                    />
                    <button>Enviar</button>
                </form>
            </div>
        </>
    )
}

export default CrearPerfil