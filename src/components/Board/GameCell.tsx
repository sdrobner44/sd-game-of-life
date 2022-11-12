import { useState } from 'react';
import ICell from '../../models/ICell';
import styles from './GameCell.module.scss';

type GameCellProps = {
  // index: number,
  cell: ICell
};

// https://www.quackit.com/css/css_color_codes.cfm
// https://www.w3schools.com/cssref/css_colors.php

interface IDynamicCellStyle {
  background: string;
}

const GameCell = ({cell}: GameCellProps) => {

  const healthyCellColor = '#006400';
  const aLittleSickCellColor = '#8FBC8F';
  const sickCellColor = '#8A2BE2';
  const emptyCellColor = '#B0C4DE';
  
  const initialCircleStyle = {
    background: emptyCellColor
  }
  const [circleStyles, setCircleStyles] = useState<IDynamicCellStyle>(initialCircleStyle);

  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // console.log(`The link was clicked for ${index}.`);
    setCircleStyles(
      {
        background: healthyCellColor
      }
    );
  }

  return (
    <div className={styles.cell} onClick={handleClick}>
       <div className={[styles.element, styles.circle].join(' ')} style={circleStyles}></div>
    </div>
  )
}

export default GameCell;