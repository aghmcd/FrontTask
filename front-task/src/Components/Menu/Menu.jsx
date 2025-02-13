import { useEffect, useState } from 'react';
import './Menu.css'
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const [foto, setFoto] = useState(null);
    const [userID, setUserID] = useState(null);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setFoto(localStorage.getItem('avatarU'));
        setUserID(localStorage.getItem('idU'));
    },[]);

    

    const onHandleLogout = () => {
        logout();
        localStorage.removeItem('idU');
        localStorage.removeItem('avatarU');
        localStorage.removeItem('emailU');
        navigate('/');
        console.log('bye...')
    }

    return (
        <>
         <div>
            <img className="profile_foto" src={foto} alt={userID} />
            <button onClick={onHandleLogout}>LogOff</button>
         </div>
        </>
    )
}

export default Menu