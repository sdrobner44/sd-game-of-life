import ICell, { createCell } from '../models/ICell';
import iDimension from './IDimension';

const getEmptyBoard = (dimention: iDimension): Array<Array<ICell>> => {

  const newBoard: Array<Array<ICell>> = [];
  for(let yIter = 0; yIter < dimention.y; yIter++) {

    const yArray = new Array<ICell>();
    newBoard.push(yArray);
    
    for(let xIter = 0; xIter < dimention.x; xIter++) {
      yArray.push(createCell(xIter, yIter))
    }      
  }

  return newBoard;
}

export default getEmptyBoard;