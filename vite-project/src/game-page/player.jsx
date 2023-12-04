import "./game.css"
import G1 from '../common/Imagenes/gangster1.png'
import G2 from '../common/Imagenes/gangster2.png'
import G3 from '../common/Imagenes/gangster3.png'
import G4 from '../common/Imagenes/gangster4.png'
import { useEffect, useState } from "react"
import axios from "axios"


function Player({ personaje, id_casilla}) {
    const[imagen, setImagen] = useState("");
    const [posicion_v, setPosicion_v] = useState("");
    const [posicion_h, setPosicion_h] = useState("");
    const [render, setRender] = useState(null);
    
    useEffect(() => {
        if (personaje === 1) {setImagen(G1);}
        else if (personaje === 2) {setImagen(G2);}
        else if (personaje === 3) {setImagen(G3);}
        else if (personaje === 4) {setImagen(G4);}
    }, [personaje]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/spaces/${id_casilla}`)
        .then((response) => {
            const data = response.data;
            setPosicion_h(data.posicion_h);
            setPosicion_v(data.posicion_v);
            setRender(true);
        })
    })

    const styles = {
        position: 'absolute',
        top: `${posicion_v+280}px`,
        left: `${posicion_h+240}px`,
        height: '110px'
        
    };

    return (
        <>
        {render && (
            <img src={imagen} style={styles}></img>
        )}
        </>
    );
}

export default Player