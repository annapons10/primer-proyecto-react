import { WINNER_COMBOS } from "../constantes";
//Método para comprobar si hay gandor:
export const checkWinner = (boardToCheck) => {
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
export const checkGameOver = (boardToCheck) =>{
    //Si todos los elementos del tablero son diferentes a null, devuelve true: 
    return boardToCheck.every(elemento => elemento !== null);
}