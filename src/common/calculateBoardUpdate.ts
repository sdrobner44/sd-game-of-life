import ICell, { CellHealthStatusEn } from '../models/ICell';
import getEmptyBoard from './getEmptyBoard';
import iDimension, { getCellKey } from './IDimension';


enum CellProcessingStateEn {
  noNei = 1,
  hasNei = 2,
}

interface ICellProcessingState extends iDimension {
  x: number;
  y: number;
  state: CellProcessingStateEn;
  nOfNeis: number;
  onlyNei: ICell;
}

export const getBoardXSize = (board:Array<Array<ICell>>): number => {
  const bSize = board && board.length > 0 ? board[0].length : 0
  return bSize;
}

export const getBoardYSize = (board:Array<Array<ICell>>): number => {
  const bSize = board ? board.length : 0
  return bSize;
}


// const getCellNeigbours = (cell: ICell, board: Array<Array<ICell>>): Array<ICell> => {

//   const resultTemp = new Array<ICell>();

//   const x = cell.x;
//   const y = cell.y;

//   // let cellNei: ICell = null;

//   // cell above
//   // xNei = x;
//   // yNei = y - 1;
//   // cellNei = yNei >= 0 ? 

//   const getRelevantCell = (xI: number, yI: number): ICell => {
//     if(xI === x && yI === y){
//       return null;
//     }
//     if(xI < 0 || xI >= getBoardXSize(board)){
//       return null;
//     }

//     if(yI < 0 || yI >= board.length){
//       return null;
//     }    

//     const cell = board[xI][yI];
//     if(cell.health === CellHealthStatusEn.empty){
//       return null;
//     }

//     return cell;
//   }

//   const delta: Array<number> = [-1, 0, 1]

//   delta.forEach((xI) => {
//     delta.forEach((yI) => {
//       const xNei = x + xI;
//       const yNei = y + yI;
//       resultTemp.push(getRelevantCell(xNei, yNei));
//      }
//     )
//    }
//   )

//   return resultTemp.filter((x) => x != null);
// }

// ----------------------------------------------------

const getCellNeigbours = (cell: ICell, 
                          changedCellsMap: Map<string, ICell>,
                          boardDimention: iDimension): Array<ICell> => {

  const resultTemp = new Array<ICell>();

  const xCell = cell.x;
  const yCell = cell.y;

  const {x: sizeX, y: sizeY} = boardDimention;

  // let cellNei: ICell = null;

  // cell above
  // xNei = x;
  // yNei = y - 1;
  // cellNei = yNei >= 0 ? 

  // get valid neighb. indexes
  const ranges = [-1, 0, 1];

  const getValidNeiKey = (xP: number, yP: number): string | null => {

    if(xP < 0) return null;
    if(xP > sizeX - 1) return null;

    if(yP < 0) return null;
    if(yP > sizeY - 1) return null;

    if(xP === xCell && yP === yCell) return null;

    return `${xP}-${yP}`;
  }

  ranges.forEach((xI) => {
    ranges.forEach((yI) => {
      const cX = xCell + xI;
      const cY = yCell + yI;
      const key = getValidNeiKey(cX, cY);
      if(key && changedCellsMap.has(key)){
        resultTemp.push(changedCellsMap.get(key));
      }
    });
  });

  return resultTemp.filter((x) => x != null);
}

// ----------------------------------------------


const processCell = (cell: ICell, 
                      changedCellsMap: Map<string, ICell>,
                      boardDimention: iDimension): ICellProcessingState => {
  const cellNei = getCellNeigbours(cell, changedCellsMap, boardDimention);
  // the reason it is an array is because 
  return {
    x: cell.x,
    y: cell.y,
    state: cellNei.length === 0? CellProcessingStateEn.noNei : CellProcessingStateEn.hasNei,
    nOfNeis: cellNei.length,
    onlyNei: cellNei.length === 1 ? cellNei[0] : null,
  }
}

// const calculateBoardUpdate = (changedCells: Array<ICell>): Array<ICell> => {
//   const calcBoard: Array<Array<ICell>> = getEmptyBoard(getBoardXSize(board), board.length);

//   // iterate through the board and determine if each cell has neigbours
//   const processingResult = new Array<ICellProcessingState>();
//   board.forEach((row: Array<ICell>) => {
//      row.forEach((cell: ICell) => {
//        if(cell.health !== CellHealthStatusEn.empty){
//          processingResult.push(processCell(cell, board));
//        }
//      })
//    }
//   );
  
//   const deterioratingHealth = processingResult.filter((x) => x.nOfNeis !== 1);

//   deterioratingHealth.forEach((pCell) => {
//     const currentBCell = board[pCell.x][pCell.y];
//     const newBCell = calcBoard[pCell.x][pCell.y];
//     newBCell.health = currentBCell.health - 1;
//   });

//   const birthingPArents = processingResult.filter((x) => x.nOfNeis === 1);

//   // use processingResult to apply it on the board

//   return calcBoard;
// }

const getChildPosition = (cellProcessing: ICellProcessingState, boardDimension: iDimension): iDimension => {

  const isVertical = cellProcessing.y !== cellProcessing.onlyNei.y;

  const cells = [cellProcessing, cellProcessing.onlyNei];

  if(isVertical) {
    let topIndex = -1;
  
    topIndex = cellProcessing.y < cellProcessing.onlyNei.y ? 0 : 1;
    const bottomIndex = topIndex === 1 ? 0 : 1;

    // is one above another
    if(cells[topIndex].x === cells[bottomIndex].x){
      // for now we will try to give birth with teh preference to the right
      // in the futire we might randomize teh side
      
      // can we do it to the right?
      if(cells[bottomIndex].x <= boardDimension.x - 2){
        const newCellDimension = {
          x: cells[bottomIndex].x + 1,
          y: cells[bottomIndex].y,
        }
        return newCellDimension;
      } else {
        const newCellDimension = {
          x: cells[bottomIndex].x - 1,
          y: cells[bottomIndex].y,
        }        
        return newCellDimension;
      }
    }

    // since we got here the cell are diagonal
    // is the botton cell on the left?
    if(cells[bottomIndex].x < cells[topIndex].x){
      const newCellDimension = {
        x: cells[bottomIndex].x + 1,
        y: cells[bottomIndex].y,
      }        
      return newCellDimension;
    }

    // if we are here - the bottom cell is to teh tight
    const newCellDimension = {
      x: cells[bottomIndex].x - 1,
      y: cells[bottomIndex].y,
    }        
    return newCellDimension;
  }  // if(isVertical) {

  // if we are here - the cells are horizontal
  // determine teh right cell and drop a chils
  // either under if there is space or above otherwise
  
  const rightCellIndex = cells[0].x > cells[1].x ? 0 : 1;
  if(cells[rightCellIndex].y < (boardDimension.y - 1)){
    const newCellDimension = {
      x: cells[rightCellIndex].x,
      y: cells[rightCellIndex].y + 1,
    }        
    return newCellDimension;
  }

  {
    const newCellDimension = {
      x: cells[rightCellIndex].x,
      y: cells[rightCellIndex].y - 1,
    }        
    return newCellDimension;
  }
}

const calculateBoardUpdate = (changedCellsMapP: Map<string, ICell>, boardDimention: iDimension): Map<string, ICell> => {

  const changedCellsMap = new Map(changedCellsMapP);

  const processingResult = new Array<ICellProcessingState>();
  Array.from(changedCellsMap.values()).forEach((cell) => {
    processingResult.push(processCell(cell, changedCellsMap, boardDimention));
  });

  // iterate through the board and determine if each cell has neigbours

  // const calculatedCells = [...changedCells];

  const deterioratingHealth = processingResult.filter((x) => x.nOfNeis !== 1);

  deterioratingHealth.forEach((pCell) => {
    const cellIter = changedCellsMap.get(getCellKey(pCell))
    cellIter.health = cellIter.health - 1;
    if(cellIter.health <= CellHealthStatusEn.empty){
      changedCellsMap.delete(getCellKey(pCell));
    }
  });

  const birthingParents = processingResult.filter((x) => x.nOfNeis === 1);
  const processingPotentialParents = new Array<ICellProcessingState>();

  // divide the list into couples
  const couplesTemp = new Set();
  birthingParents.forEach((cellIter => {
    if(!couplesTemp.has(getCellKey(cellIter))){
      processingPotentialParents.push(cellIter);
    } else {
      couplesTemp.add(getCellKey(cellIter));
      couplesTemp.add(getCellKey(cellIter.onlyNei));
    }
  }));

  processingPotentialParents.forEach((cellIter) => {
    const babyCell = getChildPosition(cellIter, boardDimention);
    changedCellsMap.set(getCellKey(babyCell), {
      x: babyCell.x,
      y: babyCell.y,
      health: CellHealthStatusEn.healthy
    });
  });
 // getChildPosition


  // use processingResult to apply it on the board

  return changedCellsMap;
}

export default calculateBoardUpdate;