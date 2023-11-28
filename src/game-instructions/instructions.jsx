import './instructions.css'
import React, { useState } from 'react'
import OpcionesJugar from './OpcionesJugar'
import Navbar from '../common/Navbar/Navbar'
function Instructions() {
    
    return (
        <>
        <nav className='nav'>
            <Navbar />
        </nav>
        <div className='pageContainer'>
            <div className='containerI'>
            <div className='tituloContainer'><h1>La ruta del crimen</h1></div>

            <br></br>
            <div className='fraseContainer'><h2>Objetivo del juego</h2></div>
        
            <div className='fraseContainer'>
            <p> El objetivo del juego es avanzar por el tablero y utilizar estratégicamente las cartas 
                para obtener ventaja sobre los demás jugadores, con el fin de convertirse en el primero 
                en llegar al final del tablero. </p>  
            </div>
            <br></br>
            <div className='fraseContainer'><h2>Desarrollo del juego</h2></div>
            
            <div className='fraseContainer'>
            <p> Cada jugador estará representado por una ficha en el tablero y comenzará con una cantidad 
                de dinero inicial. </p>
            </div>
            <div className='fraseContainer'>
            <p> El primer jugador en unirse al juego tendrá el primer turno. Luego de que el primer 
                jugador haya completado su turno, el segundo jugador que se una será el siguiente en 
                jugar, y así sucesivamente. </p>
            </div>
            <div className='fraseContainer'>
            <p> En cada turno, los jugadores roban una carta del mazo y deciden qué hacer con ella. Pueden 
                jugarla, subastarla o usar el mercado negro. </p>
            </div>

            <div className='descripcionContainer'>
            <OpcionesJugar />
            </div>

            <div className='descripcionContainer'>
            <div className='fraseContainer'>
            <p> Una vez resuelta la acción con la carta, sus efectos se aplican al jugador que la tenga, ya 
                sea por juego, subasta o mercado negro. </p>
            </div>
            <div className='fraseContainer'>
            <p> Antes de finalizar su turno, el jugador puede optar por pagar al banco para robar otra carta 
                o decidir terminar su turno. </p>
            </div>
            <div className='fraseContainer'>
            <p> El juego continúa hasta que alguien llega al final del tablero. El jugador que llegue 
                primero al final del tablero es el ganador. </p>
            </div>
            </div>
            </div> 
        </div>
        </>

    )
}
export default Instructions