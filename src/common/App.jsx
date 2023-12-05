import { useState } from 'react'
import reactLogo from './../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BotonEpico from './BotonEpico'
import Navbar from './Navbar/Navbar'
import LandingPage from './LandingPage/LandingPage'


function App() {
  const [count, setCount] = useState(0)
  const [botonpresionado, presionar] = useState(1)

  return (
    <div>
      <nav className='nav'>
        <Navbar />
      </nav>
      <div>
      <div className='pageContainer'>
        <LandingPage />
      </div>
      </div>
    </div>
  )
}

export default App

{/*<div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>SNL</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Puedes editar esta página en <code>src/App.jsx</code> como se muestra en este video:
          </p>
          <p>
            <a href='https://www.youtube.com/watch?v=LN0yLqjr_6s&list=PLtWAeOG_3SkZ-68O-CYZjn_LpgeoFbG_8&index=6'>Cápsula de React de Fernando</a>
          </p>
          
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>

        <a href='/instructions'>Instrucciones</a>
    <BotonEpico />*/}
