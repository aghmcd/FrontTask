import { useState } from "react"
import { useAuth } from "../AuthContext";
import { loginService } from "../../Services/login/loginService"
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [logForm, setLogForm] = useState({
        email: '',
        contrasena: ''
    })

    const onHandleChange = (e) => {
        const {name, value} = e.target
        setLogForm({...logForm, [name]: value})
    } 

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        const respuesta = await loginService.loginProcess(logForm);
        if(respuesta.idUsuario){
            login();
            localStorage.setItem('idU', respuesta.idUsuario);
            localStorage.setItem('emailU', respuesta.emailUsuario);
            localStorage.setItem('avatarU', respuesta.avatarUsuario);
            navigate('/Menu');
        }
    }

    const onHandleNProfile = () => {
        navigate('/new_profile');
    }

    return (
        <>
            <div className="contenedor">
                <h1>Login My To Do!</h1>
                <div>
                    <form onSubmit={onHandleSubmit}>
                        <fieldset>
                            <legend>LogIn</legend>
                                <div>
                                 <label htmlFor="email">Email</label>
                                 <input type="email" 
                                   name="email"
                                   value={logForm.email}
                                   onChange={onHandleChange}
                                   required
                                 />
                                </div>
                                <div>
                                    <label htmlFor="contrasena">Password</label>
                                    <input type="password" 
                                     name="contrasena"
                                     value={logForm.contrsena}
                                     onChange={onHandleChange}
                                     required
                                     minLength={8}
                                    />
                                </div>
                                <div>
                                    <button>LogIn</button>
                                </div>
                        </fieldset>
                    </form>
                    <div>
                        <button onClick={onHandleNProfile}>Crear Perfil</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm