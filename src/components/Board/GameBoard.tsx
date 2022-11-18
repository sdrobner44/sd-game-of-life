import { useContext } from 'react';
import BoardContext from '../../common/BoardContext';
import { getBoardXSize, getBoardYSize } from '../../common/calculateBoardUpdate';
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

  const boardX = getBoardXSize(board);
  const boardY = getBoardYSize(board);

  const boardDynStyles = {
    gridTemplateColumns: `repeat(${boardX}, 1fr)`,
    gridTemplateRows: `repeat(${boardY}, 1fr)`,
  }

  // const getCell = (index: number): JSX.Element  => {
  //   return (
  //     <GameCell key={index} index={index}/>
  //   )
  // }

  const onBoardChange = (cell: ICell): void => {
    ctx.updateCells([cell]);
  }

  const getCell = (cell: ICell): JSX.Element  => {
    return (
      <GameCell key={`${cell.x}_${cell.y}`} cell={cell} onBoardChange={onBoardChange}/>
    )
  }

  const flattened = board.reduce(
    (accumulator, currentValue) => accumulator.concat(currentValue),
    [],
  );

  const triggerManualStep = () => ctx.triggerManualStep();

  return (
    // <div className={styles.container}>
    <>
      <header>
        <button onClick={triggerManualStep}>
          Triger manual step
        </button>
      </header>
      <div className={styles.board} style={boardDynStyles}>
        {/* {[...Array(xSize * ySize)].map((x, i) =>
          getCell(i)
        )} */}
        {flattened.map((x, i) =>
          getCell(x)
        )}
      {/* </div> */}
    </div>
    </>    
  )
}

export default GameBoard;