import useWindowResize from '../../utils/hooks/useWindowResize';
import styles from './GameBoard.module.scss';
import GameCell from './GameCell';

const GameBoard = () => {

  const {
    vpWidth,
    vpHeight
  } = useWindowResize();
  

  const getCell = (index: number): JSX.Element  => {
    return (
      <GameCell key={index} index={index}/>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {[...Array(16)].map((x, i) =>
          getCell(i)
        )}
      </div>
    </div>
  )
}

export default GameBoard;