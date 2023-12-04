import "./tarjeta.css"
import sombrero from '../common/Imagenes/hat.png'


function Tarjeta({ selectedCard }) {
    if (selectedCard) {
      return (
        <div className="contenedor-cartas">
            <div className="carta">
            {/*Carta a seleccionar (sombrero)*/}
            <img className="imagen-carta" src={sombrero}></img>
            <hr></hr>
            </div>
            <div className="carta">
            {/*Carta mostrada: texto tipo e imagen de la carta*/}
            <h2>{selectedCard.tipo}</h2>
            <h3>{selectedCard.descripcion}</h3>
            </div>
        </div>
      );
    } else {
      return (
        <div className="contenedor-cartas">
            <div className="carta">
            {/*Carta a seleccionar (sombrero)*/}
            <img className="imagen-carta" src={sombrero}></img>
            <hr></hr>
            </div>
            <div className="carta">
                {/*No hay carta mostrada*/}
                <h3>No se ha seleccionado ninguna carta.</h3>
            <hr></hr>
            </div>
        </div>
      );
    }
  }

export default Tarjeta