import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

const AdminCheck = () => { 
  const { token } = useContext(AuthContext)
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    console.log(token);
    axios({
      method: 'get',
      url: `${import.meta.env.VITE_BACKEND_URL}/scope/protectedadmin`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("Enviaste un token bueno y estás logueado y eres admin!!!");
        console.log(response)
        //console.log(response.data.user)
        setMsg(response.data.message)
      })
      .catch(error => {
        console.log("Hubo un error, no estás logueado / el token expiro / no eres admin");
        console.log(error);
        setMsg(error.message);
      });
  }, []);


  return (
    <div>
      {msg}
    </div>
  );
}

export default AdminCheck;