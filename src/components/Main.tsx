import GameBoard from './Board/GameBoard';
import styles from './Main.module.scss';

function Main() {
  return (
    <article className={styles.article}>
       <GameBoard />
    </article>
  )
}

export default Main;