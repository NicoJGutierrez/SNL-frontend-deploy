import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

const UserCheck = () => { 
  const { token } = useContext(AuthContext)
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    console.log(token);
    axios({
      method: 'get',
      url: `${import.meta.env.VITE_BACKEND_URL}/scope/protecteduser`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("Enviaste un token bueno y estás logueado!!!");
        console.log(response)
        //console.log(response.data.user)
        setMsg(response.data.message)
        window.location.href='/inicio';
      })
      .catch(error => {
        console.log("Hubo un error, no estás logueado / el token expiró");
        console.log(error);
        setMsg(error.message);
      });
  }, []);


  return (
    <div>
      {msg=="Bienvenido a la ruta protegida con el scope user!" && <Inicio/> }
    </div>
  );
}

export default UserCheck;