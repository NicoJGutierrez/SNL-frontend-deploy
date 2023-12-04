import React, { useEffect, useState , useContext} from 'react'
import { FaUser, FaLock, FaEnvelope, FaArrowLeft, FaListOl, FaPassport } from "react-icons/fa"
import { AuthContext } from '../auth/AuthContext'
import { useParams } from "react-router-dom"
import axios from 'axios'
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

function CreateCard() {
    const { token } = useContext(AuthContext);
    const { id_usuario } = useParams();
    const [users, setUsers] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [tipo, setTipo] = useState("");
    const [redireccion, setRedireccion] = useState("");
    const [descripcion, setDescripcion] = useState("");
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

    const handleSubmitCreate = async (event) => {
        event.preventDefault();

        if (contieneSoloNumeros(redireccion)) {
            if (tipo == 'Avanzar' || tipo == 'Retroceder') {
                if (descripcion.length > 20) {
                    axios.post(`${import.meta.env.VITE_BACKEND_URL}/cards`, {"tipo": tipo})
                    .then((response) => {
                        console.log(response.data.id);
                        if (tipo == "Avanzar") {
                            axios.post(`${import.meta.env.VITE_BACKEND_URL}/forwards`, {
                                "id_carta": response.data.id,
                                "tipo": tipo,
                                "redireccion": redireccion,
                                "descripcion": descripcion
                            })
                            setMsg('Carta creada con éxito!');
                            setError(false);
                            window.location.href = `/inicio`;
                        } else if (tipo == 'Retroceder') {
                            axios.post(`${import.meta.env.VITE_BACKEND_URL}/backwards`, {
                                "id_carta": response.data.id,
                                "tipo": tipo,
                                "redireccion": redireccion,
                                "descripcion": descripcion
                            })
                            setMsg('Carta creada con éxito!');
                            setError(false);
                            window.location.href = `/inicio`;
                        }
                    })
                } else {
                    setErrorMsg('Descripcion ingresada es muy corta. Intentalo nuevamente.');
                    setError(true);
                }
            } else {
                setErrorMsg('Las cartas solo pueden ser de tipo "Avanzar" o "Retroceder". Intentalo nuevamente.');
                setError(true);
            }
        } else {
            setErrorMsg('Ingresa una redireccion válida. Intentalo nuevamente.');
            setError(true);
        }
    }

    

    return (
        <>
            <Navbar></Navbar>
            {admin ? (
                <div className='containerSearch' style={{ top: '70px' }}>
                    <form onSubmit={handleSubmitCreate}>
                        <h1>Crear carta</h1>
                        {msg.length > 0 && <div className="successMsg" style={{ width: '400px' }}> {msg} </div>}
                        {error && <div className="error" style={{ width: '400px' }}>{errorMsg}</div>}
                        <h3>Ingresa los datos para poder crear una carta.</h3>
                        <p>¡Importante! Recuerda ser consistente con la descripción y la redirección.</p>
                        
                        <div className='input-field-id'>
                            <i className='fas fa-id-card'></i>
                            <input
                            type="text" 
                            name="tipo"
                            placeholder='Tipo'
                            value={tipo}
                            onChange={e => setTipo(e.target.value)}
                            required/>
                        </div>
                        <div className='input-field-id'>
                            <i className='fas fa-id-card'></i>
                            <input
                            type="text" 
                            name="redireccion"
                            placeholder='Redireccion'
                            value={redireccion}
                            onChange={e => setRedireccion(e.target.value)}
                            required/>
                        </div>
                        <div className='input-field-id'>
                            <i className='fas fa-id-card'></i>
                            <input
                            type="text" 
                            name="descripcion"
                            placeholder='Descripcion'
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                            required/>
                        </div>
                        <button type="submit">Crear carta</button>
                    </form>
                    <a href= {`/searchCard`}>
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

export default CreateCard