import { useState } from 'react';
import ICell, { CellHealthStatusEn } from '../../models/ICell';
import styles from './GameCell.module.scss';

type GameCellProps = {
  // index: number,
  cell: ICell,
  onBoardChange: (cell: ICell) => void,
};

// https://www.quackit.com/css/css_color_codes.cfm
// https://www.w3schools.com/cssref/css_colors.php

interface IDynamicCellStyle {
  background: string;
}

const GameCell = ({cell, onBoardChange}: GameCellProps) => {

  const colorsMap = new Map<CellHealthStatusEn, string>([
    [CellHealthStatusEn.healthy, '#006400'],
    [CellHealthStatusEn.slightlySick, '#8FBC8F'],
    [CellHealthStatusEn.sick, '#8A2BE2'],
    [CellHealthStatusEn.dead, '#D0D0D0'],
    [CellHealthStatusEn.empty, '#B0C4DE'],    
   ]
  );
  
  const initialCircleStyle = {
    background: colorsMap.get(cell.health),
  }
  // const [circleStyles, setCircleStyles] = useState<IDynamicCellStyle>(initialCircleStyle);

  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // console.log(`The link was clicked for ${index}.`);
    // setCircleStyles(
    //   {
    //     background: colorsMap.get(CellHealthStatusEn.healthy),
    //   }
    // );
    onBoardChange({
      x: cell.x,
      y: cell.y,
      health: CellHealthStatusEn.healthy,
    });
  }

  return (
    <div className={styles.cell} onClick={handleClick}>
       <div className={[styles.element, styles.circle].join(' ')} style={initialCircleStyle}></div>
    </div>
  )
}

export default GameCell;