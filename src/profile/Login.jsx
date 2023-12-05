import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './Login.css';
import { FaUser, FaLock, FaEnvelope} from "react-icons/fa";

function Login() {
  const { token, setToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [button, setButton] = useState(false)

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/authentication/login`, {
        email, //: email,
        password//: password
      }).then((response) => {
        console.log('Login successful');
        setError(false);
        setMsg("Login exitoso!");
        // Recibimos el token y lo procesamos
        const access_token = response.data.access_token;
        localStorage.setItem('token', access_token);
        setToken(access_token);
        console.log("Se seteo el token: ", token);
        console.log(response);
        window.location.href='/usercheck';

      }).catch((error) => {
        console.error('An error occurred while trying to login:', error);
        setError(true);// aquí puede haber más lógica para tratar los errores
      }
    )
  };

  const handleSubmitSignup = async (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/authentication/signup`, {
        username: username,
        email: email,
        password: password
      }).then((response) => {
        console.log('Registro exitoso! Ahora puedes volver y loguearte');
        setError(false);
        setMsg('Registro exitoso! Ahora puedes iniciar sesión');
      }).catch((error) => {      
      console.error('Ocurrió un error:', error);
      setError(true); // aquí puede haber más lógica para tratar los errores
      });
    }

    

  return (
    <div className='Login'>
    <div className='containerr' id="containerr">
        <div className='form-containerr sign-up'>
            <form onSubmit={handleSubmitSignup}>
                {msg.length > 0 && <div className="successMsg"> {msg} </div>}

                {error && <div className="error">Hubo un error con el Registro, por favor intenta nuevamente.</div>}
                <h2>Registrarse</h2>
                <div className='input-field'>
                    <i className='fas fa-user'><FaUser/></i>
                    <input
                    type="text" 
                    name="username"
                    placeholder='Nombre'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required/>
                </div>
                <div className='input-field'>
                    <i className='fas fa-user'><FaEnvelope/></i>
                    <input
                    type="email" 
                    name="email"
                    placeholder='Correo'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required/>
                </div>
                <div className='input-field'>
                    <i className='fas fa-user'><FaLock/></i>
                    <input
                    type="password" 
                    name="password"
                    placeholder='Contraseña'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required/>
                </div>
                <a href='usercheck'>
                    <button type="submit">Registrarse</button>
                </a>  
            </form>
        </div>
        <div className='form-containerr sign-in'>
            <form onSubmit={handleSubmitLogin} >
                {msg.length > 0 && <div className="successMsg"> {msg} </div>}
                {error && <div className="error">Hubo un error al intentar iniciar sesión, por favor intenta nuevamente.</div>}

                <h2>Iniciar sesión</h2>
                <div className='input-field'>
                    <i className='fas fa-user'><FaEnvelope/></i>
                    <input
                    type="email" 
                    name="email"
                    placeholder='correo'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required/>
                </div>
                <div className='input-field'>
                    <i className='fas fa-user'><FaLock/></i>
                    <input
                    type="password" 
                    name="password"
                    placeholder='Contraseña'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required/>
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>

        <div className='toggle-containerr'>
            <div className='toggle'>
                <div className='toggle-panel toggle-left'>
                    <h1>Bienvenido de vuelta!</h1>
                    <p>Ingrese sus datos personales para utilizar todas las funciones del sitio.</p>
                    <button className='hidden' id='login' onClick={
                        () => {
                            const container = document.querySelector('#containerr');
                            container.classList.remove("active");


                        }
                    }>Iniciar sesión</button>
                </div>
                <div className='toggle-panel toggle-right'>
                    <h1>Nuevo aquí?</h1>
                    <p>Registrate con tus datos personales para utilizar todas las funciones del sitio.</p>
                    <button className='hidden' id='register' onClick={
                        () => {
                            const container = document.querySelector('#containerr');
                            container.classList.add("active");
                        }
                    }>Registrarse</button>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
}

export default Login;