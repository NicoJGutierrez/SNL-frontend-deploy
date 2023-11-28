import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import Navbar from '../common/Navbar/Navbar';
import './deploy-partidas.css'
import { Navigate } from "react-router-dom";

function DeployPartidas() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/games`)
            .then(response => {
                let i = 0;
                const partidas = {};
                const data = response.data;
                data.map((game) => {
                    if (game.num_jugadores < 4) {
                        partidas[i] = game;
                        i = i + 1
                    }
                })
                console.log(partidas);
                setGames(partidas);
            })
    }, [])

    const handleClick = async (event) => {
        event.preventDefault();

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/games`)
            .then((response) => {
                const gameInfo = response.data;
                console.log(gameInfo.id);
                window.location.href = `/charselect/${gameInfo.id}`;
            })
    }

    return (
        <>
            <Navbar></Navbar>
            <div className='container_deploy'>
            <table className='table'>
                <thead className='table_thead'>
                    <tr>
                        <th className='table_th'>ID</th>
                        <th className='table_th'>Jugadores</th>
                        <th className='table_th'>Seleccionar</th>
                    </tr>
                </thead>
                <tbody className='table_tbody'>
                    {Object.values(games).map(game=> (
                        <tr key={game} className='table-row'>
                            <td className='table-row_td'>{game.id}</td>
                            <td className='table-row_td'>{game.num_jugadores}</td>
                            <td className='table-row_td'><a href={`/charselect/${game.id}`}>Unirse</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleClick} className='button_create'>Crear Partida</button>
            </div>
        </>
    )
}

export default DeployPartidas
