import { useContext } from 'react';
import BoardContext from '../../common/BoardContext';
import ICell from '../../models/ICell';
import styles from './GameBoard.module.scss';
import GameCell from './GameCell';

interface IGameBoardProps {
  xSize: number,
  ySize: number,  
};

const GameBoard = ({xSize, ySize}: IGameBoardProps) => {

  const ctx = useContext(BoardContext);

  const board = ctx.board;

  const boardX = board.length;
  const boardY = board[0].length;

  const boardDynStyles = {
    gridTemplateColumns: `repeat(${boardX}, 1fr)`,
    gridTemplateRows: `repeat(${boardY}, 1fr)`,
  }

  // const getCell = (index: number): JSX.Element  => {
  //   return (
  //     <GameCell key={index} index={index}/>
  //   )
  // }

  const getCell = (cell: ICell): JSX.Element  => {
    return (
      <GameCell key={`${cell.x}_${cell.y}`} cell={cell}/>
    )
  }

  const flattened = board.reduce(
    (accumulator, currentValue) => accumulator.concat(currentValue),
    [],
  );

  return (
    // <div className={styles.container}>
      <div className={styles.board} style={boardDynStyles}>
        {/* {[...Array(xSize * ySize)].map((x, i) =>
          getCell(i)
        )} */}
        {flattened.map((x, i) =>
          getCell(x)
        )}
      {/* </div> */}
    </div>
  )
}

export default GameBoard;