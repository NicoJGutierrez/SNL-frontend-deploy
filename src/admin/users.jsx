import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import Navbar from '../common/Navbar/Navbar';
import './users.css'
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom"

function DeployUsuario() {
    const { token } = useContext(AuthContext);
    const { id_usuario } = useParams();
    const [user, setUser] = useState(null);
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
        instance.get(`${import.meta.env.VITE_BACKEND_URL}/users`)
        .then((response) => {
            const data = response.data;
            data.map((usuario) => {
                if (usuario.id == id_usuario) {
                    setUser(usuario);
                }
            });
        })
    }, [])

    const handleDelete = async (event) => {
        event.preventDefault();
        
        try {
            // Almacenar los jugadores asociado a este jugador
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/players/valid/${id_usuario}`)
            .then((response) => {
                const data = response.data;
                console.log(data);
                // Si el usuario tiene un jugador asociado en una partida
                if (data.length > 0) {
                    axios.put(`${import.meta.env.VITE_BACKEND_URL}/games/num_players/${data[0].id_partida}`);
                    console.log("Se disminuyo la cantidad de jugadores con éxito");
                }
            });

            axios.get(`${import.meta.env.VITE_BACKEND_URL}/players/user/${id_usuario}`)
            .then((response) => {
                const players = response.data;
                players.map((player) => {
                    instance2.delete(`${import.meta.env.VITE_BACKEND_URL}/players/${player.id}`)
                })
                axios({
                    method: 'delete',
                    url: `${import.meta.env.VITE_BACKEND_URL}/users/${id_usuario}`,
                    headers: {
                    'Authorization': `Bearer ${token}`
                    }
                });
                setMsg("Usuaio eliminado on exito");
            })
            console.log(id_usuario);
            window.location.href = `/inicio`;

            
            
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
                                <th className='table_th'>Nombre</th>
                                <th className='table_th'>Correo</th>
                                <th className='table_th'>Ranking</th>
                                <th className='table_th'></th>
                                <th className='table_th'></th>
                            </tr>
                        </thead>  
                        <tbody className='table_tbody'>
                            <tr className='usertable-row'>
                                <td className='table-row_td'>{id_usuario}</td>
                                <td className='table-row_td'>{user.nombre}</td>
                                <td className='table-row_td'>{user.mail}</td>
                                <td className='table-row_td'>{user.ranking}</td>
                                <td className='user-table-row_td'><a className='editar' href= {`/editUser/${id_usuario}`}>Editar</a></td>
                                <td className='users-table-row_td'><a className='eliminar' href='/inicio' onClick={handleDelete}>Eliminar</a></td>
                            </tr>
                        </tbody>
                    </table>
                    <a href='/searchUser'>
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

export default DeployUsuario