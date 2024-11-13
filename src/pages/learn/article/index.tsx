import useArticle from "./useArticle"

import styles from "./article.module.css";
import LearningLayout from "../LearningLayout";
import MainButton from "../../../components/main-button";

interface ArticleProps {
  titleFromOuter: string;
  contentFromOuter: string;
}

export default function Article({ contentFromOuter, titleFromOuter } : ArticleProps) {
  const { title, content, markAsRead, read, unmarkAsRead, theresUserID, addToList } = useArticle();

  return (
    <LearningLayout>
      <article>
        <section className={ styles[`article__header`]}>
          <h2>{ title || titleFromOuter }</h2>
          <section>
            { theresUserID > 0 && <MainButton onClick={ addToList }>Save to List</MainButton> }
            { !read && ( <MainButton onClick={ markAsRead }>Done</MainButton> ) }
            { read && ( <MainButton onClick={ unmarkAsRead }>Unmark</MainButton> ) }
          </section>
        </section>
        <hr />

        <div className={ styles[`article__content`] } dangerouslySetInnerHTML={{ __html: content || contentFromOuter }}></div>
      </article>
    </LearningLayout>
  )
}
