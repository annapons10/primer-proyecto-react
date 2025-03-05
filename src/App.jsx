
import { useState } from 'react'
import confetti from "canvas-confetti"
import { Square } from './components/Square.jsx'
import './App.css'
import { TURNS } from './constantes.js'
import { checkWinner  } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { checkGameOver } from './logic/board.js'

function App() {
  //Antes de crear el board vacío y empezar de 0, asegurarme de que en una partida anterior no se ha dejado una jugada a medias. 
  //No puedo añadir un hook dentro de if/bucles, etc. Tienen que estar en el cuerpo del programa. 
  //Puedo hacer que antes de asignar el board como tal. Se asegure de que no haya uno anterior: 
  
  //Lo necesito aqui para poder actualizarlo dependiendo de su estado y que se vuelva a renderizar con 'x' o 'o'.
  //Creo un estado pasándole como datos iniciales el array vacío. 
  const [board, setBoard ] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) :
    Array(9).fill(null)
  });

  //Crear un estado para saber de quien es el turno:
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turno');
    console.log(turnFromStorage)
    return turnFromStorage ?? TURNS.X;
  });

  //Crear estado para ganador: 
  const [winner, setWinner] = useState(null); //Nulll no hay ganador , false hay un empate. 


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
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X; 
    setTurn(newTurn);
    //Guardar aqui partida antes de saber si hay ganador: 
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turno', newTurn);
    //Revisar si hay ganador: 
    const newWinner = checkWinner(newBoard);
    if(newWinner){
      confetti();
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

    //ELIMINO VALORES DEL LOCALSTORAGE:
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turno');
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
      <WinnerModal winner={winner}  reiniciarJuego={reiniciarJuego} />

    </main>
  ) 
}

export default App
