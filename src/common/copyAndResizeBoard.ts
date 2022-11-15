import ICell, { createCell } from '../models/ICell';
import { getBoardXSize, getBoardYSize } from './calculateBoardUpdate';
import IDimension from './IDimension';

const copyAndResizeBoard = (board: Array<Array<ICell>>,
                            newDimension: IDimension = null): Array<Array<ICell>> => {
  const newBoard = new Array<Array<ICell>>();

  const yBSize = getBoardYSize(board);
  const xBSize = getBoardXSize(board);

  const dimention = (newDimension) ?  newDimension : {x: xBSize, y: yBSize}; 

  const xDelta = dimention.x - xBSize;
 
  for(let yIter = 0; yIter < dimention.y; yIter++) {
 
    let yArray: Array<ICell> = [];
    let xLoopDelta = xBSize;
    if(yIter > yBSize) {
      xLoopDelta = 0;
      yArray = [...Array(dimention.x)].map((x, i) => createCell(i, yIter));
    } else {
      yArray = [...board[yIter]];
    }

    if(xLoopDelta > 0) {
      const tail = [...Array(xDelta)].map((x, i) => createCell(xBSize + i, yIter));
      yArray = [...yArray, 
                ...tail
               ];
    } else if(xLoopDelta < 0) {
      yArray = yArray.splice(0, dimention.x);
    }

    newBoard.push(yArray);
  }

  return newBoard;
}

export default copyAndResizeBoard;