//Creo el componente de square, cuadrado del tablero:
export const Square = ({children, isSelected, updateBoard, index}) =>{
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
  