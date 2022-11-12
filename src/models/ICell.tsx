enum CellHealthStatusEn {
  empty = 0,
  healthy = 1,
  slightlySick = 2,
}

interface ICell {
  x: number,
  y: number,
  health: CellHealthStatusEn,
}

const createCell = (x: number, y: number, health: CellHealthStatusEn = CellHealthStatusEn.empty): ICell => {

  return {
    x,
    y,
    health
  };
}

export {CellHealthStatusEn, createCell};
export default ICell;