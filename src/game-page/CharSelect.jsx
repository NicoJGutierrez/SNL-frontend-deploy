import Navbar from "../common/Navbar/Navbar"
import Personaje from "./personaje"
import './CharSelect.css' 
import G1 from '../common/Imagenes/gangster1.png'
import G2 from '../common/Imagenes/gangster2.png'
import G3 from '../common/Imagenes/gangster3.png'
import G4 from '../common/Imagenes/gangster4.png'
import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from '../auth/AuthContext'
import axios from 'axios'


function CharSelect() {
    const{ token } = useContext(AuthContext);
    const { id_partida } = useParams();
    const [userID, setUserID] = useState(null);
    const [players, setPlayers] = useState(null);

    useEffect(() => {
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_BACKEND_URL}/scope/protecteduser`,
            headers: {
              'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setUserID(response.data.user.sub);
          })
    })

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/players/${id_partida}`)
            .then(response => {
                let i = 0;
                const jugadores = [];
                const data = response.data;
                data.map((player) => {
                    jugadores.push(player.personaje);
                    i = i + 1
                })
                console.log(jugadores);
                setPlayers(jugadores);
            })
    }, [])

    const renderPlayers =  () => {
        if (players && players.length > 0) {
            return (
                <>
                    {!players.includes(1) && <Personaje 
                    nombre={"Mr. Mostaza"} 
                    src={G1}
                    descripcion={"Un gangster violento y agresivo. Es un tipo duro, y no le importa meterse en problemas. Es un experto en el uso de armas de fuego, y no dudará en usarlas para conseguir lo que quiere."}
                    personaje = {1}
                    userID = {userID}
                    gameID = {id_partida}
                    nueva_partida = {false}
                    />}
                    {!players.includes(2) && <Personaje 
                    nombre={"El Zafiro"} 
                    src={G2}
                    descripcion={"Un gangster rico y sofisticado. Es un tipo elegante, y siempre está a la moda. Es un buen negociador, y siempre está buscando nuevas oportunidades."}
                    personaje = {2}
                    userID = {userID}
                    gameID = {id_partida}
                    nueva_partida = {false}
                    />}
                    {!players.includes(3) && <Personaje
                    nombre={"Thomas Shelby"}
                    src={G3}
                    descripcion={"El Rey de Birmingham. Un gangster líder y carismático, con una visión clara para el futuro. Es un estratega brillante y un líder astuto. Es un hombre peligroso y temible, pero también es un hombre de familia y un hombre de honor."}
                    personaje = {3}
                    userID = {userID}
                    gameID = {id_partida}
                    nueva_partida = {false}
                    />}
                    {!players.includes(4) && <Personaje
                    nombre={"Lil' Rose"}
                    src={G4}
                    descripcion={"Una gangster superficial y vanidosa, que se preocupa más por su apariencia que por sus habilidades. Es una tiradora mediocre, pero es hábil en el engaño y la manipulación."}
                    personaje = {4}
                    userID = {userID}
                    gameID = {id_partida}
                    nueva_partida = {false}
                    />}
                </>
            )
        } else if (players && players.length == 0) {
            return(
                <>
                    {<Personaje 
                    nombre={"Mr. Mostaza"} 
                    src={G1}
                    descripcion={"Un gangster violento y agresivo. Es un tipo duro, y no le importa meterse en problemas. Es un experto en el uso de armas de fuego, y no dudará en usarlas para conseguir lo que quiere."}
                    personaje = {1}
                    userID = {userID}
                    gameID = {id_partida}
                    nueva_partida = {true}
                    />}
                    {<Personaje 
                    nombre={"El Zafiro"} 
                    src={G2}
                    descripcion={"Un gangster rico y sofisticado. Es un tipo elegante, y siempre está a la moda. Es un buen negociador, y siempre está buscando nuevas oportunidades."}
                    personaje = {2}
                    userID = {userID}
                    gameID = {id_partida}
                    nueva_partida = {true}
                    />}
                    {<Personaje
                    nombre={"Thomas Shelby"}
                    src={G3}
                    descripcion={"El Rey de Birmingham. Un gangster líder y carismático, con una visión clara para el futuro. Es un estratega brillante y un líder astuto. Es un hombre peligroso y temible, pero también es un hombre de familia y un hombre de honor."}
                    personaje = {3}
                    userID = {userID}
                    gameID = {id_partida}
                    nueva_partida = {true}
                    />}
                    {<Personaje
                    nombre={"Lil' Rose"}
                    src={G4}
                    descripcion={"Una gangster superficial y vanidosa, que se preocupa más por su apariencia que por sus habilidades. Es una tiradora mediocre, pero es hábil en el engaño y la manipulación."}
                    personaje = {4}
                    userID = {userID}
                    gameID = {id_partida}
                    nueva_partida = {true}
                    />}
                </>
            )
        }

    }


    return(
    <>
    <nav className='nav'>
            <Navbar />
        </nav> 
    <h1> ELIGE TU PERSONAJE </h1>
    <div className="pagecontainer">
        <div className="toplane1">
            {renderPlayers()}
        </div>
    </div>
    </>
    )
}

export default CharSelect