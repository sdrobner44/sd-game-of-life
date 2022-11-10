import styles from './GameCell.module.scss';

type GameCellProps = {
  index: number
};

const GameCell = ({index}: GameCellProps) => {

  return (
    <div className={styles.cell}>
       <div className={[styles.element, styles.circle].join(' ')}>{index}</div>
    </div>
  )
}

export default GameCell;