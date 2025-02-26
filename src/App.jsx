
import { useState } from 'react'
import './App.css'
//TURNOS:
const TURNS = {
  X: 'x',
  O: 'o'
}


//Creo el componente de square, cuadrado del tablero:
const Square = ({children, isSelected, updateBoard, index}) =>{
  const className = `square ${isSelected ? 'is-selected' : ''}`;
  return(
    <div className='className'>
      {children}
    </div>
  )

}

function App() {
  //Lo necesito aqui para poder actualizarlo dependiendo de su estado y que se vuelva a renderizar con 'x' o 'o'.
  //Creo un estado pasándole como datos iniciales el array vacío. 
  const [board, setBoard ] = useState(Array(9).fill(null));
  //Crear un estado para saber de quien es el turno:
  const [turn, setTurn] = useState(TURNS.X);

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return(
              <Square 
                key={index}
                index={index}
              >
               
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        {/* CUANDO ESTÉ SELECCIONADO EL TURN X, SE MUESTRA LA X */}
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

    </main>
  ) 
}

export default App
