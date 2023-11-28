import "./tarjeta.css"
import sombrero from '../common/Imagenes/hat.png'

function Tarjeta() {
    
    return(
    <>
    <div className="tarjeta">
        {/*<h2>Nombre: BANANA</h2>*/}
        <img className="imagen-tarjeta" src={sombrero}></img>
        {/*<p>Efecto de la tarjeta: Jaja BANANA</p>*/}
        <hr></hr>
        
    </div>
    <div>
        <button className="boton-tarjeta">Jugar</button>
        <button className="boton-tarjeta">Subastar</button>
        <button className="boton-tarjeta">Mercado Negro</button>
    </div>
    </>
    )
    }

export default Tarjeta