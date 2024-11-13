import useArticle from "./useArticle"

import styles from "./article.module.css";
import LearningLayout from "../LearningLayout";

export default function Article() {
  const { title, content  } = useArticle();
  return (
    <LearningLayout>
      <article>
        <h2>{ title }</h2>
        <hr />

        <div className={ styles[`article__content`] } dangerouslySetInnerHTML={{ __html: content }}></div>
      </article>
    </LearningLayout>
  )
}
