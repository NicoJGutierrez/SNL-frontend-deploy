import '../Navbar/Navbar.css'
import {FaBars, FaTimes} from 'react-icons/fa'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import axios from 'axios'
import LogoutButton from '../../profile/Logout';



export default function Navbar() {
    const { token } = useContext(AuthContext);
    const [showMobileMenu, setShowMobilMenu] = useState(false);
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);

    const instance = axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });

    useEffect(() => {
        instance.get(`${import.meta.env.VITE_BACKEND_URL}/scope/protecteduser`)
        .then(response => {
            setUser(true)
        })
    })

    useEffect(() => {
        instance.get(`${import.meta.env.VITE_BACKEND_URL}/scope/protectedadmin`)
        .then(response => {
            setAdmin(true)
        })
    })

    return (
        <nav className="nav">
            <div className='wrapper'>
                <div className='logoContainer'>
                    <img src='https://i.ibb.co/qmMrmyk/hat.png'></img>
                    <a href='/'>La ruta del crimen</a>
                </div>
                <div className='menuIcon' onClick={() => setShowMobilMenu(!showMobileMenu)}>
                    { showMobileMenu ? <FaTimes /> : <FaBars /> }
                    
                </div>
                <ul className='menu' style={{ left: showMobileMenu ? "0" : "200%" }}>
                    {user ? (
                        <li className='menuItem'>
                            <a className='menuItemLink' href='/inicio' onClick={() => setShowMobilMenu(!showMobileMenu)}>
                                <div>
                                Inicio
                                </div>
                            </a>
                        </li>
                    ): (
                        <li className='menuItem'>
                            <a className='menuItemLink' href='/' onClick={() => setShowMobilMenu(!showMobileMenu)}>
                                <div>
                                Inicio
                                </div>
                            </a>
                        </li>
                    )}
                    
                    <li className='menuItem'>
                        <a className='menuItemLink' href='/instructions' onClick={() => setShowMobilMenu(!showMobileMenu)}>
                            <div>
                               Instrucciones
                            </div>
                        </a>
                    </li>
                    {user ? (
                        <>
                        <li className='menuItem'>
                            <a className='menuItemLink' href='/login' onClick={() => setShowMobilMenu(!showMobileMenu)}>
                                <div>
                                Jugar
                                </div>
                            </a>
                        </li>
                        <li className='menuItem'>
                            <a className='menuItemLink' href='/ranking' onClick={() => setShowMobilMenu(!showMobileMenu)}>
                                <div>
                                Ranking
                                </div>
                            </a>
                        </li>
                        </>
                    ): null}
                    {admin ? (
                        <>
                        <li className='menuItem'>
                            <a className='menuItemLink' href='/searchUser' onClick={() => setShowMobilMenu(!showMobileMenu)}>
                                <div>
                                Usuarios
                                </div>
                            </a>
                        </li>
                        <li className='menuItem'>
                            <a className='menuItemLink' href='/searchCard' onClick={() => setShowMobilMenu(!showMobileMenu)}>
                                <div>
                                Cartas
                                </div>
                            </a>
                        </li>
                        </>
                    ): null}
                    {user ? (
                        <>
                        <li className='menuItem'>
                            <a className='menuItemLink' href='/searchCard' onClick={() => setShowMobilMenu(!showMobileMenu)}>
                                <LogoutButton/>
                            </a>
                        </li>
                        </>
                    ): null}
                    
                </ul>
            </div>
        </nav>
    )
}

