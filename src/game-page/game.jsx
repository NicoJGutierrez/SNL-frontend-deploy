import "./game.css"
import Bidder from './../common/Bidder'
import Tablero from "./tablero"
import Tarjeta from "./tarjeta"
import Playerlist from "./playerlist"
import Navbar from "../common/Navbar/Navbar"
import Player from "./player"
import tablero from '../common/Imagenes/tablero.png'
import React, { createContext, useState, useEffect, useContext} from "react"
import axios from 'axios';
import { useParams } from "react-router-dom"
import { AuthContext } from '../auth/AuthContext';

function Game() {
    const { id_partida } = useParams();
    const { token } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [player, setPlayer] = useState(null);
    const [cards, setCards] = useState();
    const [players, setPlayers] = useState([]);
    const [listaplayers, setListaplayers] = useState([]);
    const [userID, setUserID] = useState(null);
    const [userPersonaje, setUserPersonaje] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [imagen, setImagen] = useState("");
    const [casillaID1, setCasillaID1] = useState("");
    const [casillaID2, setCasillaID2] = useState("");
    const [casillaID3, setCasillaID3] = useState("");
    const [casillaID4, setCasillaID4] = useState("");
    const [nombreganador, setNombreganador] = useState("");
    const [idganador, setIdganador] = useState("");
    const [rankingactual, setRankingactual] = useState(null);
    const instance = axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/cards`)
        .then((response) => {
            const data = response.data;
            const cartas = [];
            let i = 0;
            // console.log(data);
            data.map((card) => {
                if (card.tipo == "Avanzar") {
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/forwards/${card.id}`)
                    .then((data) => {
                        cartas.push({"id": card.id, "tipo": card.tipo, "redireccion": data.data.redireccion, "descripcion": data.data.descripcion});
                        i = i + 1;
                    });
                } else if (card.tipo == "Retroceder") {
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/backwards/${card.id}`)
                    .then((data) => {
                        cartas.push({"id": card.id, "tipo": card.tipo, "redireccion": data.data.redireccion, "descripcion": data.data.descripcion});
                        i = i + 1;
                    })
                } else if (card.tipo == "Ingreso") {
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/earnings/${card.id}`)
                    .then((data) => {
                        cartas.push({"id": card.id, "tipo": card.tipo, "monto": data.data.monto, "descripcion": data.data.descripcion});
                        i = i + 1;
                    })
                } else if (card.tipo == "Perdida") {
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/losses/${card.id}`)
                    .then((data) => {
                        cartas.push({"id": card.id, "tipo": card.tipo, "monto": data.data.monto, "descripcion": data.data.descripcion});
                        i = i + 1;
                    })
                }
            });
            // console.log(cartas);
            setCards(cartas);
        })

    }, [])


    // Parece que esto no está funcinoando
    // No aparecen los console.log() que pongo en este useEffect
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/gameData/${id_partida}`) 
            .then((response) => {
                const data = response.data[0];
                // console.log(data)
                const jugadores = {};
                data.Jugadors.map((jugador) => {
                    jugadores[jugador.id] = jugador;
                    // console.log(jugadores[jugador.id])
                });
                setPlayers(data.Jugadors);   
            })
            .catch((error) => {
                console.log(error);
            }); 
        setListaplayers(players.map((jugador) => ({id: jugador.id_usuario, personaje: jugador.personaje})));
        // console.log(players)
    }, []);


    // FUNCIONA BIEN
    useEffect(() => {
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_BACKEND_URL}/scope/protecteduser`,
            headers: {
              'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setUserID(response.data.user.sub);
            console.log(userID);
            setUser(true); // Id del que está en su computador mirando
            players.map((jugador) => {
                // console.log(jugador.id_usuario) // Funciona bien
                // console.log(userID)
                // El primero es number y el segundo string, por lo tanto pongo ==
                if (jugador.id_usuario == userID) {
                    setUserPersonaje(jugador.personaje)
                }
            })
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/gameData/${id_partida}`)
            .then(response => {
                response.data[0].Jugadors.map((jugador) => {
                    if (jugador.id_usuario == userID) {
                        setPlayer(true);
                    }
                })
            })
          })
        // console.log(userID) // Se está tomando bien. Es 1
        // console.log(userPersonaje) // Se está tomando bien. Es 1 (number)
        // Al principio aparecen como null. Después se toman bien
    })

    function handleSelectCard() {
        // console.log(userID)
        // console.log(userPersonaje)
        // console.log(cards);
        // Cuando alguien saca carta: hacer axios put (con dirección de cambio de turno) y cambiar turno
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/gameData/${id_partida}`) 
        .then((response) => {
            const cantidadUsuariosEnPartida = response.data[0].Jugadors.length;
            if (cantidadUsuariosEnPartida === 4) {

                const turnoactual = response.data[0].turno_actual;
                // console.log(typeof turnoactual) // number

                if (userPersonaje === turnoactual) {
                    // Si es el jugador en turno, puede sacar una carta
                    const selectedCard = cards[Math.floor(Math.random() * cards.length)];
                    setSelectedCard(selectedCard);
                    // ACÁ PONER QUE PASA CON LA CARTA
                    // VER SI REDIRECCION Y SI ES AVANZAR O RETROCEDER
                    // CAMBIAR ID_CASILLA DEL JUGADOR 
                    //console.log(selectedCard)
                    const cantidad_mover = selectedCard.redireccion
                    // console.log(cantidad_mover) // Se toma bien
                    if (selectedCard.tipo === "Avanzar") {
                        // El tipo de la carta es avanzar
                        axios.get(`${import.meta.env.VITE_BACKEND_URL}/players/user/${userID}`) 
                            .then((response) => {
                                const casilla_actual = response.data[0].id_casilla;
                                //console.log(casilla_actual) // Se toma bien
                                //console.log(casilla_actual + cantidad_mover)
                                if (casilla_actual + cantidad_mover <= 36) {
                                    //console.log(casilla_actual + cantidad_mover)
                                    const nueva_casilla = casilla_actual + cantidad_mover;
                                    //console.log(nueva_casilla)
                                    axios.put(`${import.meta.env.VITE_BACKEND_URL}/players/${id_partida}/${userPersonaje}`, {"id_casilla": nueva_casilla})
                                    .then(() => {
                                        setTimeout(() => {
                                            axios.get(`${import.meta.env.VITE_BACKEND_URL}/spaces/${nueva_casilla}`)
                                            .then((response) => {
                                                const tipo_casilla = response.data.tipo;
                                                console.log(response.data.tipo);
                                                if (tipo_casilla === "Escalera") {
                                                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/ladders/${nueva_casilla}`)
                                                    .then((response) => {
                                                        const casilla_final = response.data.id_nueva_casilla;
                                                        axios.put(`${import.meta.env.VITE_BACKEND_URL}/players/${id_partida}/${userPersonaje}`, {"id_casilla": casilla_final});
                                                    });
                                                } else if (tipo_casilla === "Serpiente"){
                                                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/snakes/${nueva_casilla}`)
                                                    .then((response) => {
                                                        const casilla_final = response.data.id_nueva_casilla;
                                                        axios.put(`${import.meta.env.VITE_BACKEND_URL}/players/${id_partida}/${userPersonaje}`, {"id_casilla": casilla_final});
                                                    });
                                                }
                                            });
                                        }, 1000); 
                                    });
                                    // Ver si quedó en casilla normal o especial (serpiente o escalera)
                                } else {
                                    axios.put(`${import.meta.env.VITE_BACKEND_URL}/players/${id_partida}/${userPersonaje}`, {"id_casilla":  36});
                                    // AGREGADO FIN PARTIDA
                                    // cambiar ranking del ganador
                                    // instance.get para obtener su ranking
                                    instance.get(`${import.meta.env.VITE_BACKEND_URL}/users`) 
                                    .then((response) => {
                                        players.map((jugador) => {
                                            if (jugador.personaje == userPersonaje) {
                                                setIdganador(jugador.id_usuario);
                                            }
                                        })
                                        const data = response.data;
                                        data.map((usuario) => {
                                            if (usuario.id = idganador) {
                                                setRankingactual(usuario.ranking);
                                            }
                                        })

                                        const nuevo_ranking = rankingactual + 1; 
                                        instance.put(`${import.meta.env.VITE_BACKEND_URL}/users/${idganador}`, {"ranking": nuevo_ranking});

                                    });
                                    // TERMINO AGREGADO FIN PARTIDA
                                    
                                    // Cambiar el estado de la partida porque alguien ganó
                                    try {
                                        
                                        axios.put(`${import.meta.env.VITE_BACKEND_URL}/games/estado/${id_partida}`);
                                        // AGREGADO FIN PARTIDA 
                                        if (userPersonaje == 1) {
                                            setNombreganador("Mr. Mostaza");
                                        } else if (userPersonaje == 2) {
                                            setNombreganador("El Zafiro");
                                        } else if (userPersonaje == 3) {
                                            setNombreganador("Thomas Shelby");
                                        } else if (userPersonaje == 4) {
                                            setNombreganador("Lil' Rose");
                                        }

                                        mensajeDiv.innerText = `Se acabó la partida, ganó el jugador ${nombreganador}`;
                                        mensajeDiv.style.display = 'block';

                                        // Ocultar el mensaje después de 5 segundos
                                        setTimeout(() => {
                                        mensajeDiv.style.display = 'none';
                                        // Redirigir a la pantalla de inicio después de ocultar el mensaje
                                        window.location.href = '/login';
                                        }, 5000); // Oculta después de 5 segundos (5000 milisegundos)

                                        // TERMINO AGREGADO FIN PARTIDA
                                    
                                    } catch (error) {
                                        // Manejar errores que ocurran durante las solicitudes GET o PUT
                                        console.error("Ocurrió un error: No se cambió el estado de la partida", error);
                                    }
                                }
                            }); 
                    } else {
                        // El tipo de la carta es retroceder
                        axios.get(`${import.meta.env.VITE_BACKEND_URL}/players/user/${userID}`)
                        .then((response) => {
                            const casilla_actual = response.data[0].id_casilla;
                            if (casilla_actual >= cantidad_mover) {
                                const nueva_casilla = casilla_actual - cantidad_mover;

                                // Primer axios.put
                                axios.put(`${import.meta.env.VITE_BACKEND_URL}/players/${id_partida}/${userPersonaje}`, {"id_casilla":  nueva_casilla})
                                    .then(() => {
                                        // Introducir un retraso de 1 segundo
                                        setTimeout(() => {
                                            // Segundo axios.get
                                            axios.get(`${import.meta.env.VITE_BACKEND_URL}/spaces/${nueva_casilla}`)
                                                .then((response) => {
                                                    const tipo_casilla = response.data.tipo;
                                                    if (tipo_casilla === "Escalera") {
                                                        axios.get(`${import.meta.env.VITE_BACKEND_URL}/ladders/${nueva_casilla}`)
                                                            .then((response) => {
                                                                const casilla_final = response.data.id_nueva_casilla;
                                                                // Tercer axios.put
                                                                axios.put(`${import.meta.env.VITE_BACKEND_URL}/players/${id_partida}/${userPersonaje}`, {"id_casilla": casilla_final});
                                                            });
                                                    } else if (tipo_casilla === "Serpiente") {
                                                        axios.get(`${import.meta.env.VITE_BACKEND_URL}/snakes/${nueva_casilla}`)
                                                            .then((response) => {
                                                                const casilla_final = response.data.id_nueva_casilla;
                                                                // Tercer axios.put
                                                                axios.put(`${import.meta.env.VITE_BACKEND_URL}/players/${id_partida}/${userPersonaje}`, {"id_casilla": casilla_final});
                                                            });
                                                    }
                                                });
                                        }, 1000); // Retraso de 1 segundo
                                    });
                            } else {
                                // Cuarto axios.put
                                axios.put(`${import.meta.env.VITE_BACKEND_URL}/players/${id_partida}/${userPersonaje}`, {"id_casilla":  0});
                            }
                        });
                    }

                    // Cuando alguien saca carta cambiar turno
                    axios.put(`${import.meta.env.VITE_BACKEND_URL}/games/turno/${id_partida}`);
                } else {
                    // Si no es el jugador en turno, no puede sacar una carta
                    alert('No eres el jugador en turno');
                }
            } else {
                alert('La partida no tiene suficientes usuarios. Espera para comenzar el juego');
            }
        })

    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Lógica que se ejecutará cada 1 segundo
            // Puedes agregar aquí cualquier código que desees ejecutar repetidamente
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/players/${id_partida}`)
            .then((response) => {
                const players = response.data;
                players.map((player) => {
                    if (player.id == 1) {
                        setCasillaID1(player.id_casilla);
                    } else if (player.id == 2) {
                        setCasillaID2(player.id_casilla);
                    } else if (player.id == 3) {
                        setCasillaID3(player.id_casilla);
                    } else if (player.id == 4) {
                        setCasillaID4(player.id_casilla);
                    }
                })
            })
            //console.log('Efecto ejecutado cada 1 segundo');
        }, 1000);

        // Limpieza del intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, [/* Dependencias aquí */]);

    return(
    <>
    <nav className='nav'>
        <Navbar />
    </nav>
    {user ? (
        <div className="pageContainer">
            {player ? (
                <div className="pagecontainer">
                    <div className="toplane">
                        <div>
                            <img className="imagen-tablero" src={tablero}></img>
                            <Player personaje={1} id_casilla={casillaID1}/>
                            <Player personaje={2} id_casilla={casillaID2}/>
                            <Player personaje={3} id_casilla={casillaID3}/>
                            <Player personaje={4} id_casilla={casillaID4}/>
                        </div>
                        <div>
                            <h1>JUGADORES</h1>
                            <Playerlist gameID={id_partida}/> 
                            {cards && <h1>CARTAS</h1>}
                            <Tarjeta selectedCard={selectedCard}/>
                            <button onClick={() => handleSelectCard()}>Sacar Carta</button>

                        </div>
                        
                    </div>
                </div>
            ) : (
                <div className='Redirigir' style={{ top: '-100px' }}>
                    <h2>No tienes autorización para poder estar en esta partida</h2>
                    <div className='redirigir'>
                        <p style={{ display: 'inline-block' }}>No eres un usuario que participa en esta partida</p>
                        <a style={{ display: 'inline-block' }} href='/inicio'>Volver al inicio.</a>
                    </div>
                </div>
            )}   
        </div>
    ) : (
        <div className='Redirigir'>
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

export default Game