import React, { useState } from 'react';

export default function BotonEpico(){
    const [botonPresionado, setPresionado] = useState("Sin Presionar");
    const handleClick = () => {
        if (botonPresionado == "Sin Presionar") {
            setPresionado("Presionado");
        } else {
            setPresionado("Sin Presionar");
        }
    };
    return(
        <div>
            <button onClick={handleClick}>
                {botonPresionado}
            </button>
        </div>
    )
}
