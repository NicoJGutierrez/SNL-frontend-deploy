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
            <p> Cada jugador estará representado por una ficha en el tablero y comenzará en la casilla inicial. </p>
            </div>
            <div className='fraseContainer'>
            <p> El usuario en comenzar el juego será el que haya escogido al jugador 1, luego continuará el 
                jugador 2 y así sucesivamente. </p>
            </div>
            <div className='fraseContainer'>
            <p> En cada turno, los jugadores roban una carta del mazo la cual indicará cuantas casillas deben avanzar o retroceder.</p>
            </div>

            <div className='descripcionContainer'>
            <OpcionesJugar />
            </div>

            <div className='descripcionContainer'>
            <div className='fraseContainer'>
            <p> Antes de finalizar su turno, si el jugador cayó en una casilla especial (escalera o serpiente)
                se moverá "a través" de esta y quedará en la casilla final correspondiente. </p>
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