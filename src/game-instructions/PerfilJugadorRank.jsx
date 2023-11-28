import "./Ranking.css";

export default function PerfilJugador({usuario, ranking, seunio}) {
    let indiceT = seunio.indexOf("T");
    let seunio_sin_t
    if (indiceT !== -1) {
        seunio_sin_t = seunio.slice(0, indiceT);
      }
    return(
    <>
    <div className="item-lista">
        <h2>{usuario}</h2>
        <h3>{"Ranking: " + ranking}</h3>
        <p>{"Jugador desde: " + seunio_sin_t}</p>
    </div>
    </>
    )
}
