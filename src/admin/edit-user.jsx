import React, { useEffect, useState , useContext} from 'react'
import { FaUser, FaLock, FaEnvelope, FaArrowLeft, FaListOl, FaPassport } from "react-icons/fa"
import { AuthContext } from '../auth/AuthContext'
import { useParams } from "react-router-dom"
import axios from 'axios'
import bcrypt from 'bcryptjs'
import Navbar from '../common/Navbar/Navbar'
import './users.css'


function contieneSoloNumeros(str) {
    // Utiliza una expresión regular para verificar si el string contiene solo números
    return /^\d+$/.test(str);
}

function esFormatoEmail(str) {
    // Expresión regular para validar el formato de un correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(str);
}

function esAlfanumerico(str) {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(str);
}

function cumpleRequisito(str) {
    const tieneLetra = /[a-zA-Z]/.test(str);
    const tieneNumero = /\d/.test(str);
    const tieneCaracterEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(str);

    return tieneLetra && tieneNumero && tieneCaracterEspecial;
}

function EditUsuario() {
    const { token } = useContext(AuthContext);
    const { id_usuario } = useParams();
    const [users, setUsers] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [password, setPassword] = useState("");
    const [ranking, setRanking] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [msg, setMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [error, setError] = useState(false);

    const instance = axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });

    useEffect(() => {
        instance.get(`${import.meta.env.VITE_BACKEND_URL}/scope/protectedadmin`)
        .then(response => {
            setAdmin(true)
        })
    })

    useEffect(() => {
        instance.get(`${import.meta.env.VITE_BACKEND_URL}/users`)
        .then((response) => {
            const data = response.data;
            setUsers(data);
        })
    }, [admin])

    const updateUser = async (newData) => {
        try {
          const response = await instance.put(
            `${import.meta.env.VITE_BACKEND_URL}/users/${id_usuario}`,
            newData
          );
          // El servidor ha respondido correctamente
          setMsg('Usuario actualizado');
          window.location.href = `/adminUser/${id_usuario}`;
        } catch (error) {
          // Manejar errores
          setErrorMsg("Hubo un error al intentar actualizar los datos, por favor intenta nuevamente.")
          console.error('Error al actualizar el usuario:', error);
        }
      };

    const handleName = async (event) => {
        if (name.length > 0 && esAlfanumerico(name)) {
            updateUser({"nombre": name});
            setError(false);
        } else {
            setErrorMsg("Ingresa un nombre de usuario válido. Este debe ser alfanumérico.");
            setError(true);
        }
    };

    const handleEmail = async (event) => {
        if (email.length > 0 && esFormatoEmail(email)) {
            updateUser({"mail": email});
            setError(false);
        } else {
            setErrorMsg("Ingresa un correo válido.");
            setError(true);
        }
    };

    const handlePassword = async (event) => {
        if (password.length > 7) {
            if(cumpleRequisito(password)) {
                try { 
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);
                    updateUser({"contrasena": hashedPassword});
                    setError(false);
                } catch (error) {
                    console.log('Error al hashear la contraseña:', error);
                    setErrorMsg("Hubo un error al intentar actualizar los datos, por favor intenta nuevamente.");
                    setError(true);
                }  
            } else {
                setErrorMsg("La contraseña debe tener por lo menos una letra, un número y un caracter especial. Intentalo nuevamente.");
                setError(true);
            };
        } else {
            setErrorMsg("La contraseña debe tener por lo menos 8 caracteres. Intentalo nuevamente.");
            setError(true);
        }
    };

    const handleRanking = async (event) => {
        if (ranking.length > 0 && contieneSoloNumeros(ranking)) {
            updateUser({"ranking": ranking});
            setError(false);
        } else {
            setErrorMsg("Ingresa un ranking válido.")
            setError(true);
        }
    };

    return (
        <>
            <Navbar></Navbar>
            {admin ? (
                <div className='containerSearch' style={{ top: '70px' }}>
                    {msg.length > 0 && <div className="successMsg" style={{ width: '400px' }}> {msg} </div>}

                    {error && <div className="error" style={{ width: '400px' }}>{errorMsg}</div>}
                    <h2>Ingresa un nuevo nombre</h2>
                    <div className='form'>
                        <div className='input-field-id'>
                            <i className='fas fa-id-card'><FaUser/></i>
                            <input
                            type="text" 
                            name="name"
                            placeholder='Nombre'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required/>
                        </div>
                        <button onClick={handleName}>Actualizar</button>
                    </div>
                    <h2>Ingresa un nuevo correo</h2>
                    <div className='form'>
                        <div className='input-field-id'>
                            <i className='fas fa-id-card'><FaEnvelope/></i>
                            <input
                            type="email" 
                            name="email"
                            placeholder='Correo'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required/>
                        </div>
                        <button onClick={handleEmail}>Actualizar</button>
                    </div>
                    <h2>Ingresa una nueva contraseña</h2>
                    <div className='form'>
                        <div className='input-field-id'>
                            <i className='fas fa-id-card'><FaLock/></i>
                            <input
                            type="text" 
                            name="password"
                            placeholder='Contraseña'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required/>
                        </div>
                        <button onClick={handlePassword}>Actualizar</button>
                    </div>
                    <h2>Ingresa un nuevo rankings</h2>
                    <div className='form'>
                        <div className='input-field-id'>
                            <i className='fas fa-id-card'><FaListOl/></i>
                            <input
                            type="text" 
                            name="ranking"
                            placeholder='Ranking'
                            value={ranking}
                            onChange={e => setRanking(e.target.value)}
                            required/>
                        </div>
                        <button onClick={handleRanking}>Actualizar</button>
                    </div>
                    <a href= {`/adminUser/${id_usuario}`}>
                        <i className='fas fa-id-card'><FaArrowLeft/></i>
                        Volver
                    </a>
                </div>
            ):(
                <div className='containerUsuarios'>
                    <h2>No tienes autorización para poder estar en esta página</h2>
                    <div className='redirigir'>
                        <a style={{ display: 'inline-block' }} href='/login'>Inicia sesión</a>
                        <p style={{ display: 'inline-block' }}>o</p>
                        <a style={{ display: 'inline-block' }} href='/login'>registrate</a>
                        <p error>para poder desbloquear todo el contenido de la ruta del crimen :)</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditUsuario