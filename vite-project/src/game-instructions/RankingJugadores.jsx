import "./Ranking.css";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../auth/AuthContext';
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';
import Navbar from "../common/Navbar/Navbar";

function Ranklist() {
    const { token } = useContext(AuthContext);
    const [usuarios, setUsuarios] = useState([]);
    const [user, setUser] = useState(null);

    const instance = axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });

    useEffect(() => {
        instance.get(`${import.meta.env.VITE_BACKEND_URL}/scope/protecteduser`)
        .then(response => {
            setUser(true)
        })
    })

    useEffect(() => {
        instance.get(`${import.meta.env.VITE_BACKEND_URL}/users`)
            .then((response) => {
                const data = response.data;

                // Verificar que 'data' está definido y no está vacío
                if (data && data.length > 0) {
                    const usuarios = data.sort((a, b) => b.ranking - a.ranking); // Ordenar por ranking de mayor a menor

                    // Establecer el estado con la lista completa de usuarios ordenada
                    setUsuarios(usuarios);
                } else {
                    console.error("La estructura de datos recibida no es la esperada:", data);
                }
            })
            .catch((error) => {
                console.error("Error al obtener usuarios:", error);
            });

    }, []);

    return (
        <>
        <nav className='nav'>
            <Navbar />
        </nav>
        {user ? (
                <div className='containerUsuarios'>
                    <h2 className="inicio">Ranking de usuarios:</h2>
                    <table className='tableUsuarios'>
                        <thead className='table_thead'>
                            <tr>
                                <th className='table_th'>Nombre</th>
                                <th className='table_th'>Ranking</th>
                                <th className='table_th'>Jugador desde</th>
                            </tr>
                        </thead>  
                        <tbody className='table_tbody'>
                            {Object.values(usuarios).map(user=> (
                                <tr className='usertable-row'  key={user.id}>
                                    <td className='table-row_td'>{user.nombre}</td>
                                    <td className='table-row_td'>{user.ranking}</td>
                                    <td className='table-row_td'>{user.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                        <p style={{ display: 'inline-block' }}>para poder desbloquear todo el contenido de la ruta del crimen :)</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default Ranklist;
