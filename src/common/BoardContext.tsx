import { createContext, useEffect, useState } from 'react';
import ICell, { createCell } from '../models/ICell';
import getEmptyBoard from './getEmptyBoard';

const emptyBoard: ICell[][] = [[]];

const BoardContext = createContext({
  dummy: false,
  board: emptyBoard,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateBoardSize: (x: number, y: number): void => {}
});

interface iDimension {
  x: number;
  y: number;  
}

export const BoardContextProvider = (props: { children: any; }) => {
  const [dummy, setDummy] = useState(false)
  const [board, setBoard] = useState(emptyBoard);
  const [dimentions, setDimensions] = useState<iDimension>({x:5, y:5});

  const recalculateBoard = () => {
    console.log('recalculating board');
  }

  useEffect(() => {
    const boardRecalcInterval = setInterval(recalculateBoard, 2000)

    return ()=> {
      clearInterval(boardRecalcInterval);
    };

  }, []);

  useEffect(() => {
    const newBoard = getEmptyBoard(dimentions.x, dimentions.y);
    setBoard(newBoard);
  }, [dimentions]);

  const updateBoardSize = (x: number, y: number): void => {
    try {
      setDummy(true);
    } catch (ex) {
      console.log('BoardContextProvider -> updateBoardSize', ex);
    }    
  }

  const contextVal = {dummy,
    board,
    updateBoardSize
  };

  const provider = <BoardContext.Provider value={contextVal}>
     {props.children}
   </BoardContext.Provider>

  return provider; 
}

export default BoardContext;