import useWindowResize from '../utils/hooks/useWindowResize';
import GameBoard from './Board/GameBoard';
import styles from './Main.module.scss';

function Main() {

  const {
    vpWidth,
    vpHeight
  } = useWindowResize();

  const height = vpHeight * 0.8;

  // for now we cover the case where the width is bigger the height
  const dynamicStyle = {
    height,
    width: height,
  }

  return (
    <article className={styles.article} style={dynamicStyle}>
       <GameBoard xSize={10} ySize={10} />
    </article>
  )
}

export default Main;