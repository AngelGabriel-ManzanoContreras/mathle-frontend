import useTopic from './useTopic';

import { Link } from 'react-router-dom';
import styles from './topic.module.css';
import { onErrorImageFunction } from '../../../assets';

import LearningLayout from '../LearningLayout';
import Article from '../article';

export default function Topic() {
  const { topic, content, subtopics } = useTopic();

  if ( topic?.has_content ) return <Article contentFromOuter={ content } titleFromOuter={ topic.title } />;

  return (
    <LearningLayout>
      <article className={ styles[`topic`] }>
        <figure className={ styles[`topic__figure`] }>
          <img 
            className={ styles[`topic__image`] }
            src={ topic?.img_cover } 
            onError={ onErrorImageFunction }
            alt={ topic?.title }
          />
        </figure>

        <section className={ styles[`topic__description`] }>
          <h2>{ topic?.title }</h2>
          <pre>{ topic?.description }</pre>
        </section>

          { subtopics?.length > 0 &&
            <section className={ styles[`topic__subtopics-show`] }>
              <h3>Suptopics</h3>
              <ul className={ styles[`topic__subtopics`] }>
                {
                  subtopics.map( (subtopic, index) => {
                    return ( <li> <Link to={ subtopic.link } key={ index }>{ subtopic.title }</Link> </li> )
                  })
                }
              </ul>
            </section>
        }
      </article>
    </LearningLayout>
  )
}
