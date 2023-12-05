import React, {useContext, useState} from 'react';
import './Login.css';
import { AuthContext } from '../auth/AuthContext';

const LogoutButton = () => {
  const {logout} = useContext(AuthContext);
  const [msg, setMsg] = useState("");

  const handleLogout = () => {
    logout();
    setMsg("Has hecho logout con éxito!")
    window.location.href='/LandingPage';
  }

  return (
    <>
        {/*msg.length > 0 && <div className="successMsg"> {msg} </div>*/}
        <a onClick={handleLogout} href='/LandingPage'>
        Salir
        </a>
    </>
  );
}

export default LogoutButton;