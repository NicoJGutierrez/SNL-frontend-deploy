import "./tablero.css";
import PropTypes from 'prop-types';

function Casilla({color, numero, personajes}) {
    //console.log(numero)

    return(
    <>
    <div key = {"c" + numero} className = {color}>
        {numero}{personajes}{console.log(numero)}
    </div>
    </>
    )
}

Casilla.propTypes = {
    color: PropTypes.string.isRequired,
    numero: PropTypes.string,
    personajes: PropTypes.array
  }

export default Casilla