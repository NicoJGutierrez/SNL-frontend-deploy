import { useState, useEffect } from "react"
import "./playerlist.css"
import G1 from '../common/Imagenes/gangster1.png'
import G2 from '../common/Imagenes/gangster2.png'
import G3 from '../common/Imagenes/gangster3.png'
import G4 from '../common/Imagenes/gangster4.png'

export default function Playercard({id, personaje, money}) {
    const[soborno, cambiarSoborno] = useState(1);
    const[imagen, setImagen] = useState("");
    
    useEffect(() => {
        if (personaje === 1) {setImagen(G1);}
        else if (personaje === 2) {setImagen(G2);}
        else if (personaje === 3) {setImagen(G3);}
        else if (personaje === 4) {setImagen(G4);}
    }, [personaje]);

    return(
    <>
    <div className="perfil-jugador">
        {/*<img className="imagen-jugador" src="https://vejasp.abril.com.br/wp-content/uploads/2016/12/enhanced-14386-1407330577-18.png?w=568&h=720&crop=1"></img>*/}
        {}
        <img className="imagen-jugador" src={imagen}></img>
        <div>
            <div className="info-jugador">
                <div>
                    <h3>{id}</h3>
                    <h3>${money}</h3>
                </div>
                {/* <div>
                    <button className="boton-jugador">Sobornar por {soborno}</button>
                </div>
            </div>
           <div className="slider-parent">
                <input type="range"
                min="1" 
                max="40" 
                value={soborno}
                onChange={({ target: { value: radius } }) => {
                    cambiarSoborno(radius);
                }}
                />*/}
            </div>
        </div>
    </div>
    </>
    )
}
