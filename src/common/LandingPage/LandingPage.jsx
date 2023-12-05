import { useState, useEffect, useContext } from 'react'
import '../LandingPage/LandingPage.css'
import Imagen from '../Imagenes/Imagen.png'
import Stairs from '../Imagenes/stairs2.png'
import { BsDot } from 'react-icons/bs'
import Routing from '../Routing'
import { AuthContext } from '../../auth/AuthContext'


export default function LandingPage() {
    const { token } = useContext( AuthContext )
    const [finishedTimeout, setFinishedTimeout] = useState(false)
    const [startedTimeout, setStartedTimeout] = useState(true)
    const [dot1Timeout, setDot1Timeout] = useState(true)
    const [dot2Timeout, setDot2Timeout] = useState(true)
    const [dot3Timeout, setDot3Timeout] = useState(true)
    const [dot4Timeout, setDot4Timeout] = useState(true)
    const [dot5Timeout, setDot5Timeout] = useState(true)
    const [dot6Timeout, setDot6Timeout] = useState(true)
    const [buttonTimeout, setbuttonTimeout] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setFinishedTimeout(true);
        }, 3000);

        setTimeout(() => {
            setStartedTimeout(false);
        }, 3000);

        setTimeout(() => {
            setDot1Timeout(false);
        }, 1000);
        setTimeout(() => {
            setDot2Timeout(false);
        }, 2000);
        setTimeout(() => {
            setDot3Timeout(false);
        }, 2900);
        
        setTimeout(() => {
            setDot4Timeout(false);
        }, 4000);
        setTimeout(() => {
            setDot5Timeout(false);
        }, 5000);
        setTimeout(() => {
            setDot6Timeout(false);
        }, 5900);
        setTimeout(() => {
            setbuttonTimeout(true);
        }, 6000);

    })
    
    return (
        
        <div className='landingPageContainer'>
            {startedTimeout &&
                <div className='fContainer'>
                    <div className='imgContainerL'>
                        <img src={Imagen}></img>
                    </div>
                    <div className='dotContainer'>
                        {dot1Timeout && <BsDot/>}
                        {dot2Timeout && <BsDot/>}
                        {dot3Timeout && <BsDot/>}
                    </div>
                </div>
            }
            {finishedTimeout && 
                <div className='sContainer'>
                    <div className='aboutContainer'>
                        <div className='fraseContainerL'>
                            <p> El juego "La ruta del crimen" desafía a los jugadores a avanzar estratégicamente por un 
                            tablero mientras utilizan cartas con efectos diversos, que pueden ayudar o perjudicar. </p>
                            <p>Los jugadores pueden jugar las cartas, subastarlas o usar el mercado negro para 
                            adquirirlas, mientras gestionan su dinero inicial. </p>
                            <p>El objetivo es ser el primero en llegar al final del tablero, tomando 
                            decisiones tácticas en cada turno para alcanzar la victoria. </p>
                        </div>
                        <div className='stairContainer'>
                            <img src={Stairs}></img>
                        </div>
                    </div>
                    <div className='aboutContainer2'>
                        <div className='dotContainer2'>
                            {dot4Timeout && <BsDot/>}
                            {dot5Timeout && <BsDot/>}
                            {dot6Timeout && <BsDot/>}
                            {buttonTimeout && token=='null' &&
                                <a className='iniciarSesion' href='/login'>Comenzar</a>
                            }
                            {buttonTimeout && token!='null' &&
                                <a className='iniciarSesion' href='/inicio'>Comenzar</a>
                            }
                        </div>
                    </div>
                </div>       
            }
        </div>
    )
}

