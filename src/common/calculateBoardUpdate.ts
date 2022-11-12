import ICell, { CellHealthStatusEn } from '../models/ICell';


enum CellProcessingStateEn {
  noNei = 1,
  hasNei = 2,
}

interface ICellProcessingState {
  x: number;
  y: number;
  state: CellProcessingStateEn;
  nOfNeis: number;
}

const getBoardXSize = (board:Array<Array<ICell>>): number => {
  return board[0].length;
}

const getCellNeigbours = (cell: ICell, board: Array<Array<ICell>>): Array<ICell | null> => {

  const resultTemp = new Array<ICell | null>();

  const x = cell.x;
  const y = cell.y;

  // let cellNei: ICell = null;

  // cell above
  // xNei = x;
  // yNei = y - 1;
  // cellNei = yNei >= 0 ? 

  const getRelevantCell = (xI: number, yI: number): ICell | null => {
    if(xI === x && yI === y){
      return null;
    }
    if(xI < 0 || xI >= getBoardXSize(board)){
      return null;
    }

    if(yI < 0 || yI >= board.length){
      return null;
    }    

    const cell = board[xI][yI];
    if(cell.health === CellHealthStatusEn.empty){
      return null;
    }

    return cell;
  }

  const delta: Array<number> = [-1, 0, 1]

  delta.forEach((xI) => {
    delta.forEach((yI) => {
      const xNei = x + xI;
      const yNei = y + yI;
      resultTemp.push(getRelevantCell(xNei, yNei));
     }
    )
   }
  )

  return resultTemp.filter((x) => x != null);
}

const processCell = (cell: ICell, board: Array<Array<ICell>>): ICellProcessingState | null => {
  const cellNei = getCellNeigbours(cell, board);
  // the reason it is an array is because 
  return {
    x: cell.x,
    y: cell.y,
    state: cellNei.length === 0? CellProcessingStateEn.noNei : CellProcessingStateEn.hasNei,
    nOfNeis: cellNei.length,
  }
}

const calculateBoardUpdate = (board: Array<Array<ICell>>): Array<Array<ICell>> => {
  const calcBoard: Array<Array<ICell>> = [];

  // iterate through the board and determine if each cell has neigbours
  const processingResult = new Array<ICellProcessingState | null>();
  board.forEach((row: Array<ICell>) => {
     row.forEach((cell: ICell) => {
       if(cell.health !== CellHealthStatusEn.empty){
         processingResult.push(processCell(cell, board));
       }
     })
   }
  );
  
  // use processingResult to apply it on the board

  return calcBoard;
}

export default calculateBoardUpdate;