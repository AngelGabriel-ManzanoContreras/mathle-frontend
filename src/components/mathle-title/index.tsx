import styles from './mathle-title.module.css';

import { mathleIcon } from '../../assets/index';

interface IMathleTitleProps {
  title: string
}

export default function MathleTitle({ title }: IMathleTitleProps) {
  return (
    <div className={ styles[`mathle-title__title-container`] }>
      <h2>{ title }</h2>
      <figure className={ styles[`mathle-title__figure`] }>
        <img src={ mathleIcon } alt="Mathle" />
      </figure>
    </div>
  )
}
