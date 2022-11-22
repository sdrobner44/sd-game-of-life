import { createContext, useEffect, useState } from 'react';
import ICell, { createCell } from '../models/ICell';
import calculateBoardUpdate, { getBoardXSize } from './calculateBoardUpdate';
import copyAndResizeBoard from './copyAndResizeBoard';
import getEmptyBoard from './getEmptyBoard';
import iDimension, { getCellKey } from './IDimension';

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
  // eslint-disable-next-line @typescript-eslint/no-empty-function    
  triggerManualStep: (): void => {},
});

// interface iDimension {
//   x: number;
//   y: number;  
// }

export const BoardContextProvider = (props: { children: any; }) => {
  const [dummy, setDummy] = useState(false)
  const [board, setBoard] = useState(emptyBoard);
  const [dimentions, setDimensions] = useState<iDimension>({x:5, y:5});
  // const [changedCells, setChangedCells] = useState(new Array<ICell>());
  const [changedCellsMap, setChangedCellsMap] = useState(new Map<string, ICell>());
  const [toggleStepTrigger, setToggleStepTrigger] = useState<boolean>(false);

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

    // const updatedCellsTEmp = updatedCellsBuffer;
    // setUpdatedCellsBuffer([]);

    // updatedCellsTEmp.forEach((cell) => {
    //   resizedBoard[cell.x][cell.y].health = cell.health;
    // })

    const recalsCells = calculateBoardUpdate(changedCellsMap, dimentions)

    const applyUpdatedCells = () => {
      recalsCells.forEach((cellIter) => {
        resizedBoard[cellIter.x][cellIter.y].health = cellIter.health;
      });
    }
  
    applyUpdatedCells();

    // const calcBoard = calculateBoardUpdate(resizedBoard);
    
    // setBoard(calcBoard);
    setBoard(resizedBoard);
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
    // const boardRecalcInterval = setInterval(recalculateBoard, 2000)

    // return ()=> {
    //   // clearInterval(boardRecalcInterval);
    // };

    recalculateBoard();

  }, [dimentions, toggleStepTrigger]);

  const updateBoardSize = (x: number, y: number): void => {
    try {
      setDummy(true);
    } catch (ex) {
      console.log('BoardContextProvider -> updateBoardSize', ex);
    }    
  }

  const updateCells = (cells: Array<ICell>): void => {
    try {
      // console.log('updateCells', cells, updatedCellsBuffer);

      const newMap = new Map(changedCellsMap);
      cells.forEach((cellIter) => {
        newMap.set(getCellKey(cellIter), cellIter);  
      });

      const newBoard = getEmptyBoard(dimentions.x, dimentions.y);
      Array.from(newMap.values()).forEach((cellIter) => {
        newBoard[cellIter.y][cellIter.x].health = cellIter.health;
      })

      setChangedCellsMap(newMap);

      setBoard(newBoard);
    } catch (ex) {
      console.log('BoardContextProvider -> updateCells', ex);
    }    
  }
  // sdDebounce(fn: func, arg: string, delay: number) 
  const contextVal = {dummy,
    board,
    updateBoardSize,
    updateCells,
    triggerManualStep: () => setToggleStepTrigger((previous) => !previous),
  };

  const provider = <BoardContext.Provider value={contextVal}>
     {props.children}
   </BoardContext.Provider>

  return provider; 
}

export default BoardContext;