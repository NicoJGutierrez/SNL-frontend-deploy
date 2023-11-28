import "./Ranking.css";
import React, { useState, useEffect } from "react";
import PerfilJugador from "./PerfilJugadorRank";
import axios from 'axios';
import Navbar from "../common/Navbar/Navbar";

function Ranklist() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`)
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
        <h2>e</h2>
        <h2 className="inicio">Ranking de usuarios:</h2>
            <div className="lista-principal">
                {console.log(usuarios)}
                {usuarios.map(usuario => (
                    <PerfilJugador key={usuario.id} usuario={usuario.nombre} ranking={usuario.ranking} seunio={usuario.createdAt}/>
                ))}
            </div>
        </>
    );
}

export default Ranklist;
