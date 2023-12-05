import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import Navbar from '../common/Navbar/Navbar';
import './users.css'
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom"

function DeployUsuarios() {
    const { token } = useContext(AuthContext);
    const { id_usuario } = useParams();
    const [users, setUsers] = useState(null);
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
            setUsers(data);
        })
    }, [])

    

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
                            </tr>
                        </thead>  
                        <tbody className='table_tbody'>
                            {Object.values(users).map(user=> (
                                <tr className='usertable-row'>
                                    <td className='table-row_td'>{user.id}</td>
                                    <td className='table-row_td'>{user.nombre}</td>
                                    <td className='table-row_td'>{user.mail}</td>
                                    <td className='table-row_td'>{user.ranking}</td>
                                </tr>
                            ))}
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

export default DeployUsuarios