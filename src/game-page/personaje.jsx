import "./tarjeta.css";
import axios from 'axios';

function Personaje({nombre, src, descripcion, personaje, userID, gameID, nueva_partida}) {
    const id_partida = Number(gameID);
    const id_usuario = Number(userID);
    console.log(personaje, Number(gameID), Number(userID));

    const handleClick = async (event) => {
        event.preventDefault();

        if (!nueva_partida) {
            axios.put(`${import.meta.env.VITE_BACKEND_URL}/games/num_jugadores/${gameID}`)
            .then((response) => {
                console.log("actualización numero jugadores exitosos!");
                //axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${Number(gameID)}`)
                //.then((res) => {
                    //const gameInfo = res.data;
                    //if (gameInfo.num_jugadores == 4) {
                        //axios.put(`${import.meta.env.VITE_BACKEND_URL}/games/num_jugadores/${gameID}`)
                    //}
                //})
            }).catch((error) => {
                console.error("Ocurrió un error al intentar actualizar el numero de jugadores:", error)  
            })
        };

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/players`, {
            personaje: personaje, 
            id_partida: Number(gameID),
            id_usuario: Number(userID)
        }).then((response) => {
            console.log("POST jugador exitosos!");
            window.location.href = `/game/${gameID}`;
        }).catch((error) => {
            console.error("Ocurrió un error al intentar crear el jugador:", error)  
        })

    };
   
    return(
    <>
    <a href="/game" onClick={handleClick}>
        <div className="tarjeta">
            <h2>{nombre}</h2>
            <img className="imagen-tarjeta" src={src}></img>
            <p>{descripcion}</p>
            <hr></hr>
        </div>
    </a>
    </>
    )
    }

export default Personaje