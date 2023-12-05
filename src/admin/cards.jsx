import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import Navbar from '../common/Navbar/Navbar';
import './users.css'
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom"
import { BiCard } from 'react-icons/bi';

function DeployCarta() {
    const { token } = useContext(AuthContext);
    const { id_carta } = useParams();
    const [card, setCard] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [msg, setMsg] = useState("");

    const instance = axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });

    const instance2 = axios.create({
        headers: {
          Authorization: `Bearer ${import.meta.env.TOKEN}`,
        },
    });

    useEffect(() => {
        instance.get(`${import.meta.env.VITE_BACKEND_URL}/scope/protectedadmin`)
        .then(response => {
            setAdmin(true)
        })
    })

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/cards`)
        .then((response) => {
            const data = response.data;
            data.map((carta) => {
                if (carta.id == id_carta) {
                    if (carta.tipo == 'Retroceder') {
                        axios.get(`${import.meta.env.VITE_BACKEND_URL}/backwards/${id_carta}`)
                        .then((resp) => {
                            setCard({
                                "id": id_carta,
                                "tipo": carta.tipo,
                                "redireccion": resp.data.redireccion,
                                "descripcion": resp.data.descripcion 
                            });
                        })
                    } else if (carta.tipo == 'Avanzar') {
                        axios.get(`${import.meta.env.VITE_BACKEND_URL}/forwards/${id_carta}`)
                        .then((resp) => {
                            setCard({
                                "id": id_carta,
                                "tipo": carta.tipo,
                                "redireccion": resp.data.redireccion,
                                "descripcion": resp.data.descripcion 
                            });
                        })
                    }
                    
                }
            });
        })
    }, [])

    const handleDelete = async (event) => {
        event.preventDefault();
        
        try {
            if (card.tipo == "Retroceder") {
                instance2.delete(`${import.meta.env.VITE_BACKEND_URL}/backwards/${card.id}`)
                .then((response) => {
                    instance2.delete(`${import.meta.env.VITE_BACKEND_URL}/cards/${card.id}`)
                    .then((response) => {
                        setMsg("Carta eliminada con exito");
                        window.location.href = `/inicio`;
                    })
                })
            } else if (card.tipo == "Avanzar") {
                instance2.delete(`${import.meta.env.VITE_BACKEND_URL}/forwards/${card.id}`)
                .then((response) => {
                    instance2.delete(`${import.meta.env.VITE_BACKEND_URL}/cards/${card.id}`)
                    .then((response) => {
                        setMsg("Carta eliminada con exito");
                        window.location.href = `/inicio`;
                    })
                })
            }
        } catch (error) {
            console.error('Error al realizar la solicitud DELETE:', error)
        }
    }

    return (
        <>
            <Navbar></Navbar>
            {admin ? (
                <div className='containerUsuarios'>
                    {msg.length > 0 && <div className="successMsg" style={{ width: '400px' }}> {msg} </div>}
                    <table className='tableUsuarios'>
                        <thead className='table_thead'>
                            <tr>
                                <th className='table_th'>ID</th>
                                <th className='table_th'>Tipo</th>
                                <th className='table_th'>Redireccion</th>
                                <th className='table_th'>Descripcion</th>
                                <th className='table_th'></th>
                                <th className='table_th'></th>
                            </tr>
                        </thead>  
                        <tbody className='table_tbody'>
                            {card && (
                                <tr className='usertable-row'>
                                    <td className='table-row_td'>{card.id}</td>
                                    <td className='table-row_td'>{card.tipo}</td>
                                    <td className='table-row_td'>{card.redireccion}</td>
                                    <td className='table-row_td'>{card.descripcion}</td>
                                    <td className='user-table-row_td'><a className='editar' href= {`/editCard/${card.id}`}>Editar</a></td>
                                    <td className='users-table-row_td'><a className='eliminar' onClick={handleDelete} href='/inicio'>Eliminar</a></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <a href='/searchCard'>
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
                        <p style={{ display: 'inline-block' }}>para poder desbloquear todo el contenido de la ruta del crimen :)</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeployCarta