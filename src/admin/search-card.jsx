import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import Navbar from '../common/Navbar/Navbar';
import './users.css'
import { FaIdCard, FaArrowLeft } from "react-icons/fa";

function contieneSoloNumeros(str) {
    // Utiliza una expresión regular para verificar si el string contiene solo números
    return /^\d+$/.test(str);
}
function SearchCarta() {
    const { token } = useContext(AuthContext);
    const [cards, setCards] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [id, setId] = useState("");
    const [msg, setMsg] = useState("");

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
        instance.get(`${import.meta.env.VITE_BACKEND_URL}/cards`)
        .then((response) => {
            const data = response.data;
            setcards(data);
        })
    }, [admin])

    const handleSearch = async (event) => {
        if (id.length > 0 && contieneSoloNumeros(id)) {
            instance.get(`${import.meta.env.VITE_BACKEND_URL}/cards`)
            .then((response) => {
                const ids = [];
                const data = response.data;
                data.map((usuario) => {
                    ids.push(usuario.id)
                });
                if (ids.includes(Number(id))) {
                    window.location.href = `/adminCards/${id}`;
                } else {
                    setMsg("No existe una carta con ese ID en la base de datos.");
                }
            })
            
        } else {
            setMsg("Ingresa un ID válido.");
        }
    };

    return (
        <>
            <Navbar></Navbar>
            {admin ? (
                <div className='containerSearch'>
                    {msg.length > 0 && <div className="error" style={{ width: '400px' }}> {msg} </div>}
                    <h2>Ingresa un ID de carta</h2>
                    <div className='form'>
                        <div className='input-field-id'>
                            <i className='fas fa-id-card'><FaIdCard/></i>
                            <input
                            type="text" 
                            name="id"
                            placeholder='Id                     '
                            value={id}
                            onChange={e => setId(e.target.value)}
                            required/>
                        </div>
                        <button onClick={handleSearch}>Buscar</button>
                    </div>
                    <div>
                        {/*<p style={{ display: 'inline-block' }}>¿No sabes qué carta buscas?</p>
                        <a href='/cards'>Ver lista de cartas</a>
                        <br></br>*/}
                        <p style={{ display: 'inline-block' }}>¿Deseas crear una nueva carta?</p>
                        <a href='/createCard' style={{ display: 'inline-block' }}>Crear carta</a>
                    </div>
                    <a href='/inicio'>
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

export default SearchCarta;