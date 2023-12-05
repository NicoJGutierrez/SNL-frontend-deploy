import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import Navbar from '../common/Navbar/Navbar';
import './users.css'
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom"

function DeployCards() {
    const { token } = useContext(AuthContext);
    const [cards, setCards] = useState(null);
    const [admin, setAdmin] = useState(null);
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
        const cartas = []
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/cards`)
        .then((response) => {
            const data = response.data;
            data.map((carta) => {
                if (carta.tipo == 'Retroceder') {
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/backwards/${carta.id}`)
                    .then((resp) => {
                        cartas.push({
                            "id": carta.id,
                            "tipo": carta.tipo,
                            "redireccion": resp.data.redireccion,
                            "descripcion": resp.data.descripcion 
                        });
                    })
                } else if (carta.tipo == 'Avanzar') {
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/forwards/${carta.id}`)
                    .then((resp) => {
                        cartas.push({
                            "id": carta.id,
                            "tipo": carta.tipo,
                            "redireccion": resp.data.redireccion,
                            "descripcion": resp.data.descripcion 
                        });
                    })
                }
            }); 
            setCards(cartas);
        })
    }, [])

    

    return (
        <>
            <Navbar></Navbar>
            {admin ? (
                <div className='containerUsuarios'>
                    {msg.length > 0 && <div className="successMsg" style={{ width: '400px' }}> {msg} </div>}
                    {cards && (
                        <table className='tableUsuarios'>
                            <thead className='table_thead'>
                                <tr>
                                    <th className='table_th'>ID</th>
                                    <th className='table_th'>Tipo</th>
                                    <th className='table_th'>Redireccion</th>
                                    <th className='table_th'>Descripcion</th>
                                </tr>
                            </thead>
                            {console.log(cards)}
                            <tbody className='table_tbody'>
                                {cards.map(carta => (
                                    <tr key={carta.id} className='usertable-row'>
                                        {console.log(carta)}
                                        <td className='table-row_td'>{carta.id}{console.log(carta.id)}</td>
                                        <td className='table-row_td'>{carta.tipo}{console.log(carta.tipo)}</td>
                                        <td className='table-row_td'>{carta.redireccion}{console.log(carta.redireccion)}</td>
                                        <td className='table-row_td'>{carta.descripcion}{console.log(carta.descripcion)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
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

export default DeployCards