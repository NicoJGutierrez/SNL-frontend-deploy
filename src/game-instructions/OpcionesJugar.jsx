import React, { useState } from 'react'
import './OpcionesJugar.css'

function OpcionesJugar() {
  const datos = [
    { titulo: 'Jugar la carta', descripcion: 'Al jugar una carta, sus efectos se activan, los cuales pueden comprender avance, retroceso o poderes especiales, y pueden influir positiva o negativamente en su progreso en el juego.' },
  ]

  const [descripcionVisible, setDescripcionVisible] = useState('')

  const mostrarDescripcion = (titulo) => {setDescripcionVisible(titulo)}

  const ocultarDescripcion = () => {setDescripcionVisible('')}

  return (
    <div className="opciones-container">
      {datos.map((elemento, indice) => (
        <div
          key={indice}
          className={`opcion ${descripcionVisible === elemento.titulo ? 'active' : ''}`}
          onMouseEnter={() => mostrarDescripcion(elemento.titulo)}
          onMouseLeave={ocultarDescripcion}
        >
          <div className="opcion-titulo">{elemento.titulo}</div>

          <div className={`opcion-descripcion ${descripcionVisible === elemento.titulo ? 'active' : ''}`}>
            {elemento.descripcion}</div>
          
        </div>
      ))}
      
    </div>
  )
}

export default OpcionesJugar
