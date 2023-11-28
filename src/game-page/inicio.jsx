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
            setUserID(response.data.user.sub);
          })
    })

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
        })
    }

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
            <div className='Inicio'>
                <div className='information'>
                    <div className='containers1'>
                        <h2>Bienvenid@, {name}!</h2>
                        <br></br>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quibusdam. Culpa, ab maxime. Ipsam sunt repellat quos eaque quisquam omnis soluta, sapiente id possimus optio vitae enim iusto velit corporis!</p>
                    </div>
                    <br></br>
                    <div className='containers2'>
                        <div className='container3'>
                            <a href='/games' onClick={handleClick}>Jugar</a>
                        </div>
                        <div className='container3'>
                            <a>Ranking</a>
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
        </div>
    )
    }

export default Inicio