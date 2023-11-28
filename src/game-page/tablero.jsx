import "./tablero.css";
import Casilla from "./casilla";
import PropTypes from 'prop-types';

function Tablero({altura, ancho}) {

    const lista_de_casillas = []
    let logs = 0
    for (let i = 0; i < altura; i++){
        const fila = []
        for (let j = 0; j < ancho; j++){
            //console.log((j + (ancho * i)))
            logs += 1;
            if (j + (ancho * i) == 0){
                fila.push(<Casilla color="casilla-inicial" numero={j + (ancho * i)} personajes={[]} />)
            }
            else if(j + (ancho * i) == altura*ancho){
                fila.push(<Casilla color="casilla-final" numero="Fin" personajes={[]} />)
            }
            else if((i + j)%2 == 0){
                fila.push(<Casilla color="casilla-blanca" numero={j + (ancho * i)} personajes={[]} />)
            }
            else{
                fila.push(<Casilla color="casilla-negra" numero={j + (ancho * i)} personajes={[]} />)
            }
        }
        lista_de_casillas.push(<div key={"f" + i} className="row">{fila}</div>)
        //console.log("f" + i)
    }
    console.log("Total casillas: " + logs)

    return(
    <>
    
    <div className="tablero-container">
        <div className="tablero_normal">
            {lista_de_casillas}
        </div>
    </div>
    </>
    )
}

Tablero.propTypes = {
    altura: PropTypes.number.isRequired,
    ancho: PropTypes.number.isRequired
  }

export default Tablero