import ICell, { createCell } from '../models/ICell';

const getEmptyBoard = (xSize: number, ySize: number): Array<Array<ICell>> => {

  const newBoard: Array<Array<ICell>> = [];
  for(let yIter = 0; yIter < ySize; yIter++) {

    const yArray = new Array<ICell>();
    newBoard.push(yArray);
    
    for(let xIter = 0; xIter < xSize; xIter++) {
      yArray.push(createCell(xIter, yIter))
    }      
  }

  return newBoard;
}

export default getEmptyBoard;