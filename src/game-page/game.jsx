import "./game.css"
import Bidder from './../common/Bidder'
import Tablero from "./tablero"
import Tarjeta from "./tarjeta"
import Playerlist from "./playerlist"
import Navbar from "../common/Navbar/Navbar"
import React, { createContext, useState, useEffect} from "react"
import axios from 'axios';
import { useParams } from "react-router-dom"

function Game() {
    const { id_partida } = useParams();

    return(
    <>
    <nav className='nav'>
            <Navbar />
        </nav>
    <div className="pageContainer">   
    <div className="pagecontainer">
        <div className="toplane">
            <div>
                <Tablero altura={8} ancho={8} />
                <Bidder money="45"></Bidder>
            </div>
            <div>
                <h1>JUGADORES</h1>
                <Playerlist gameID={id_partida}/>
                <h1>CARTAS</h1>
                <Tarjeta />
            </div>
            
        </div>
    </div>
    </div>
    </>
    )
}

export default Game