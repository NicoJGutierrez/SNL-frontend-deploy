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

function EditCard() {
    const { token } = useContext(AuthContext);
    const { id_carta } = useParams();
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

    const handleSubmitEdit = async (event) => {
        event.preventDefault();

        if (contieneSoloNumeros(redireccion)) {
            if (descripcion.length > 20) {
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/cards/${id_carta}`)
                .then((response) => {
                    if (response.data.tipo == "Avanzar") {
                        axios.put(`${import.meta.env.VITE_BACKEND_URL}/forwards/${id_carta}`, {
                            "redireccion": redireccion,
                            "descripcion": descripcion
                        })
                        setMsg('Carta creada con éxito!');
                        setError(false);
                        window.location.href = `/inicio`;
                    } else if (response.data.tipo == 'Retroceder') {
                        axios.put(`${import.meta.env.VITE_BACKEND_URL}/backwards/${id_carta}`, {
                            "redireccion": redireccion,
                            "descripcion": descripcion
                        })
                        setMsg('Carta editada con éxito!');
                        setError(false);
                        window.location.href = `/inicio`;
                    }
                })
            } else {
                setErrorMsg('Descripcion ingresada es muy corta. Intentalo nuevamente.');
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
                    <form onSubmit={handleSubmitEdit}>
                        <h1>Editar carta</h1>
                        {msg.length > 0 && <div className="successMsg" style={{ width: '400px' }}> {msg} </div>}
                        {error && <div className="error" style={{ width: '400px' }}>{errorMsg}</div>}
                        <h3>Ingresa los datos para poder editar la carta.</h3>
                        <p>¡Importante! Recuerda ser consistente con la descripción y la redirección.</p>
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
                        <button type="submit">Actualizar carta</button>
                    </form>
                    <a href= {`/adminCards/${id_carta}`}>
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

export default EditCard