import '../Navbar/Navbar.css'
import {FaBars, FaHome, FaTimes} from 'react-icons/fa'
import { BiSolidHelpCircle } from 'react-icons/bi'
import { useState } from 'react'


export default function Navbar() {
    const [showMobileMenu, setShowMobilMenu] = useState(false)

    return (
        <nav className="nav">
            <div className='wrapper'>
                <div className='logoContainer'>
                    <img src='https://i.ibb.co/qmMrmyk/hat.png'></img>
                    <p>La ruta del crimen</p>
                </div>
                <div className='menuIcon' onClick={() => setShowMobilMenu(!showMobileMenu)}>
                    { showMobileMenu ? <FaTimes /> : <FaBars /> }
                    
                </div>
                <ul className='menu' style={{ left: showMobileMenu ? "0" : "200%" }}>
                    <li className='menuItem'>
                        <a className='menuItemLink' href='/' onClick={() => setShowMobilMenu(!showMobileMenu)}>
                            <div>
                               {/* <FaHome /> */}
                               Home 
                            </div>
                        </a>
                    </li>
                    <li className='menuItem'>
                        <a className='menuItemLink' href='/instructions' onClick={() => setShowMobilMenu(!showMobileMenu)}>
                            <div>
                               {/* <BiSolidHelpCircle /> */}
                               Instructions
                            </div>
                        </a>
                    </li>
                    <li className='menuItem'>
                        <a className='menuItemLink' href='/login' onClick={() => setShowMobilMenu(!showMobileMenu)}>
                            <div>
                               Play
                            </div>
                        </a>
                    </li>
                    <li className='menuItem'>
                        <a className='menuItemLink' href='/ranking' onClick={() => setShowMobilMenu(!showMobileMenu)}>
                            <div>
                               Best Players
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

