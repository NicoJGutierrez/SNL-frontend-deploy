import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import LogoutButton from '../profile/Logout';
import Navbar from '../common/Navbar/Navbar';
import './inicio.css'
import gangster from '../common/Imagenes/gangster.png'

function Inicio() {
    const{ token } = useContext(AuthContext);
    const [userID, setUserID] = useState(null);
    const [name, setName] = useState("");
    const [user, setUser] = useState();
    const [admin, setAdmin] = useState(false);
    const [state, setState] = useState(null);

    const instance = axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    useEffect(() => {
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_BACKEND_URL}/scope/protecteduser`,
            headers: {
              'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if (response.data.user.scope.includes("user")) {
                setUserID(response.data.user.sub);
                setUser(true);
            }
            axios({
                method: 'get',
                url: `${import.meta.env.VITE_BACKEND_URL}/scope/protectedadmin`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setAdmin(true);
                console.log("Eres admin");
            });
          })
        
          setState(true);
    }, [token])

    const handleClick = async (event) => {
        event.preventDefault();

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/players/valid/${userID}`)
        .then((response) => {
            const data = response.data;
            
            if (response.data.length == 0) {
                window.location.href = `/games`;
            } else {
                const gameID = data[0].id_partida;
                window.location.href = `/game/${gameID}`;
            }
        }
    ), [userID]}

    useEffect(() => {
        instance.get(`${import.meta.env.VITE_BACKEND_URL}/users`)
        .then((response) => {
            const data = response.data;
            data.map((usuario) => {
                if (usuario.id == userID) {
                    setName(usuario.nombre);
                }
            });
        })
    })

    return(
        <div>
            <Navbar></Navbar>
            {user ? (
                <div className='Inicio'>
                    <div className='information'>
                        <div className='containers1'>
                            <h2>Bienvenid@, {name}!</h2>
                            <br></br>
                            {admin ? (
                                <div>
                                    <p>Eres un <strong>Usuario Administrador</strong></p>
                                    <p>Al ser <strong>Administrador</strong> tienes la posibilidad de crear, obtener, actualizar y eliminar tanto usuarios como cartas, según estimes conveniente!</p>
                                </div>
                            ) : (
                                <div>
                                    <p>Eres un <strong>Usuario</strong></p>
                                    <p></p>
                                </div>
                            )}
                            <p>Al ser <strong>Usuario</strong> tienes la posbilidad de participar de partidas de la ruta de el crimen, puedes unirte a alguna pre-existente o crear tus propias partidas. Además tienes la pósibilidad de ver el ranking actual de los usuarios que participan de este juego.</p> 
                        </div>
                        <br></br>
                        {admin ? (
                            <div className='containers4'>
                                <div className='container5'>
                                    <a href='/searchUser'>Administrar Usuarios</a>
                                </div>
                                <div className='container5'>
                                    <a href='/searchCard'>Administrar Cartas</a>
                                </div>
                            </div>
                        ): null}
                        <br></br>
                        <div className='containers2'>
                            <div className='container3'>
                                <a href='/games' onClick={handleClick}>Jugar</a>
                            </div>
                            <div className='container3'>
                                <a href='/ranking'>Ranking</a>
                            </div>
                            <div className='container3'>
                                <LogoutButton></LogoutButton>
                            </div>
                        </div>
                    </div>
                    <div className='image-container'>
                        <img src={gangster}></img>
                    </div>
                </div>
            ): 
            (<div className='Redirigir'>
                <h2>No tienes autorización para poder estar en esta página</h2>
                <div className='redirigir'>
                    <a style={{ display: 'inline-block' }} href='/login'>Inicia sesión</a>
                    <p style={{ display: 'inline-block' }}>o</p>
                    <a style={{ display: 'inline-block' }} href='/login'>registrate</a>
                    <p style={{ display: 'inline-block' }}>para poder desbloquear todo el contenido de la ruta del crimen :)</p>
                </div>
            </div>)
            }
        </div>
    )
    }

export default Inicio