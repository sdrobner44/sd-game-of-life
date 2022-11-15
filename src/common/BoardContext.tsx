import { createContext, useEffect, useState } from 'react';
import ICell, { createCell } from '../models/ICell';
import calculateBoardUpdate, { getBoardXSize } from './calculateBoardUpdate';
import copyAndResizeBoard from './copyAndResizeBoard';
import getEmptyBoard from './getEmptyBoard';
import iDimension from './IDimension';

// const emptyBoard: ICell[][] = [[]];
const emptyBoard: ICell[][] = [];
// const emptyBoard: ICell[][] = null;

const BoardContext = createContext({
  dummy: false,
  board: emptyBoard,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateBoardSize: (x: number, y: number): void => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function  
  updateCells: (cells: Array<ICell>): void => {},
});

// interface iDimension {
//   x: number;
//   y: number;  
// }

export const BoardContextProvider = (props: { children: any; }) => {
  const [dummy, setDummy] = useState(false)
  const [board, setBoard] = useState(emptyBoard);
  const [dimentions, setDimensions] = useState<iDimension>({x:5, y:5});

  let updatedCellsBuffer: Array<ICell> = [];

  const recalculateBoard = () => {
    console.log('recalculating board');

    // was the board was ever initialized ?
    if(board.length === 0){
      setBoard(getEmptyBoard(dimentions.x, dimentions.y));
      return;
    }

    // was the dimention changed?
    const deltaX: number = dimentions.x - getBoardXSize(board);
    const deltaY: number = dimentions.y - board.length;
    
    const resizedBoard = copyAndResizeBoard(board);

    const calcBoard = calculateBoardUpdate(resizedBoard);

    const updatedCellsTEmp = [...updatedCellsBuffer];
    updatedCellsBuffer = [];

    updatedCellsTEmp.forEach((cell) => {
      calcBoard[cell.x][cell.y].health = cell.health;
    })

    setBoard(calcBoard);
  }

  // useEffect(() => {
  //   const boardRecalcInterval = setInterval(recalculateBoard, 2000)

  //   return ()=> {
  //     clearInterval(boardRecalcInterval);
  //   };

  // }, []);

  // useEffect(() => {
  //   const newBoard = getEmptyBoard(dimentions.x, dimentions.y);
  //   setBoard(newBoard);
  // }, [dimentions]);

  useEffect(() => {
    const boardRecalcInterval = setInterval(recalculateBoard, 2000)

    return ()=> {
      clearInterval(boardRecalcInterval);
    };

  }, [dimentions]);

  const updateBoardSize = (x: number, y: number): void => {
    try {
      setDummy(true);
    } catch (ex) {
      console.log('BoardContextProvider -> updateBoardSize', ex);
    }    
  }

  const updateCells = (cells: Array<ICell>): void => {
    try {
      // const newBoard = getEmptyBoard(dimentions.x, dimentions.y);
      // cells.forEach((cell) => {
      //   newBoard[cell.x][cell.y].health = cell.health;
      // })
      // setBoard(newBoard);
  
      updatedCellsBuffer = [...updatedCellsBuffer, ...cells];
    } catch (ex) {
      console.log('BoardContextProvider -> updateCells', ex);
    }    
  }


    // sdDebounce(fn: func, arg: string, delay: number) 

  const contextVal = {dummy,
    board,
    updateBoardSize,
    updateCells
  };

  const provider = <BoardContext.Provider value={contextVal}>
     {props.children}
   </BoardContext.Provider>

  return provider; 
}

export default BoardContext;