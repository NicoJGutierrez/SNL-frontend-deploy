import "./playerlist.css";
import React, { useContext, useState, useEffect } from "react";
import Playercard from "./playercard";
import axios from 'axios';

function Playerlist(gameID) {
    const [players, setPlayers] = useState([]);

    // Obtener los jugadores de la partida actual
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/gameData/${gameID.gameID}`) 
            .then((response) => {
                const data = response.data[0];
                //console.log(data.Jugadors);
                const jugadores = {};
                data.Jugadors.map((jugador) => {
                    jugadores[jugador.id] = jugador;
                    console.log(jugador);
                    console.log(jugadores[jugador.id])
                });
                //console.log(jugadores)
                setPlayers(data.Jugadors);
                //console.log(players);
                
            })
            .catch((error) => {
                console.log(error);
            }); 
            
    }, []);


    return(
    <>
    <div className="perfiles-jugadores">
        <div className="perfiles-jugadores-row">
            {console.log(players)}
            {Object.values(players).map(player=> (
                <Playercard key={player.id_usuario} id={player.id_usuario} personaje={player.personaje} money={player.dinero}/>
            ))}
        </div>
    </div>
    </>
    )
    }

export default Playerlist