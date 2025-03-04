
import { useState } from 'react'
import './App.css'
//TURNOS:
const TURNS = {
  X: 'x',
  O: 'o'
}


//Creo el componente de square, cuadrado del tablero:
const Square = ({children, isSelected, updateBoard, index}) =>{
  //Si recibe el parámetro isSelected y es true, añade la clase, si no la deja en square:
  const className = `square ${isSelected ? 'is-selected' : ''}`;
  //Declaro una función fuera del onclick y no la llamo directamente porque necesito enviarle parámetros a la función y desde dentro no es correcto: 
  const handleClick = () => {
    updateBoard(index)
  }

  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )

}

//Declaro todas las combinaciones posibles de ganador: 
const WINNER_COMBOS = [ 
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {
  //Lo necesito aqui para poder actualizarlo dependiendo de su estado y que se vuelva a renderizar con 'x' o 'o'.
  //Creo un estado pasándole como datos iniciales el array vacío. 
  const [board, setBoard ] = useState(Array(9).fill(null));
  //Crear un estado para saber de quien es el turno:
  const [turn, setTurn] = useState(TURNS.X);
  //Crear estado para ganador: 
  const [winner, setWinner] = useState(null); //Nulll no hay ganador , false hay un empate. 

  //Método para comprobar si hay gandor:
  const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo; 
      if(boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]; //Devuelvo el ganador. 
      }
    }
    return null; //No hay ganador. 
  }

  //Función para comprobar que el juego ha terminado proque estan todas las casillas llenas: 
  const checkGameOver = (boardToCheck) =>{
      //Si todos los elementos del tablero son diferentes a null, devuelve true: 
      return boardToCheck.every(elemento => elemento !== null);
  }

  //Creo la función que maneja todo:
  const updateBoard = (index) => {
    //Para no sobreescribir, si ya tiene algo, no escribe, o si hay un ganador tampoco: 
    if(board[index] || winner) return; 
    //CREO UNA NUEVA REFERENCIA EN MEMORIA / NUEVO OBJETO PARA QUE REACT DISPARE UN RE-RENDERIZADO:
    const newBoard = [...board];
    //En el index donde se ha hecho click, se ha guardado turno x u o: 
    newBoard[index] = turn; 
    setBoard(newBoard);
    //Primero cambio el turno: 
    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);
    //Revisar si hay ganador: 
    const newWinner = checkWinner(newBoard);
    if(newWinner){
      setWinner(newWinner);
    } 

    const gameOver = checkGameOver(newBoard); 
    if(gameOver){
      //Empate
      setWinner(false);
    }
  }

  const reiniciarJuego = () => {
    //VACIO EL BOARD DIRECTAMENTE SIN NECESIDAD DE CREAR NUEVOS ESTADOS:
    setBoard(Array(9).fill(null));
    //CAMBIO TURNO PARA EMPEZAR SI QUIERO RESETEARLO CON UN VALOR NUEVO, CREO UN ELEMENTO Y LO AÑADO. 
    // Cambiamos el turno. Si el turno es X, cambiamos a O, y viceversa.
    const nuevoTurno = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(nuevoTurno); // Actualizamos el estado de `turn`
    //Para que se elimine el div del anunciante. 
    setWinner(null);
  }


  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={reiniciarJuego}>Reset del Juego</button>
      <section className='game'>
        {
          board.map((value, index) => {
            return(
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {/* Este es el children que se le pasa al componente square. Al principio es null pero cuando se renderiza, puede ser 'x' o 'x' */}
                {value}
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

      {/* Seccuón con  un renderizdo dinámico condicional para mostrar ganador, empate */}
      {/* {condición && <Componente o JSX a renderizar>} */}
      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false ? 'Empate' : 'Ganó'
                }
              </h2>

              <header className='win'>
                {winner && <Square>{winner}</Square> }
              </header>

              <footer>
                <button onClick={reiniciarJuego}>Empezar de nuevo </button>
              </footer>
            </div>
          </section>
        )
      }


    </main>
  ) 
}

export default App
