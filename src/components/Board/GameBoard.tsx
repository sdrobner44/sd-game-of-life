import styles from './GameBoard.module.scss';
import GameCell from './GameCell';

interface IGameBoardProps {
  xSize: number,
  ySize: number,  
};

const GameBoard = ({xSize, ySize}: IGameBoardProps) => {

  const boardDynStyles = {
    gridTemplateColumns: `repeat(${xSize}, 1fr)`,
    gridTemplateRows: `repeat(${ySize}, 1fr)`,
  }

  const getCell = (index: number): JSX.Element  => {
    return (
      <GameCell key={index} index={index}/>
    )
  }

  return (
    // <div className={styles.container}>
      <div className={styles.board} style={boardDynStyles}>
        {[...Array(xSize * ySize)].map((x, i) =>
          getCell(i)
        )}
      {/* </div> */}
    </div>
  )
}

export default GameBoard;