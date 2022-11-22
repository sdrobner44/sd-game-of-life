interface iDimension {
  x: number;
  y: number;  
}

export const getCellKey = (dim: iDimension) => `${dim.x}-${dim.y}`

export default iDimension;