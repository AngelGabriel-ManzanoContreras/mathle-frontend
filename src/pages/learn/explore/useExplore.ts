import { useState, useEffect } from "react";

import dummyArticles from "../../../logic/dummies/dummy_articles"
import { TArticle } from "../../../logic/types/TArticle";

export default function useExplore() {
  const [ articles, setArticles ] = useState( dummyArticles );
  const [ articlesJoined, setArticlesJoined ] = useState( [] );
  
  const getArticle = ( id_article : number ) => articles.find( (article : TArticle) => article.id_article === id_article );

  const getRelativePath = ( article : TArticle ) => {
    if ( article.type === 'subject' ) return article.title;

    if ( article.type === 'topic' ) {
      const parent = getArticle(article.parent_id);
      return `${ parent.title }/${article.title }`;
    }

    if ( article.type === 'subtopic' ) {
      const parent = getArticle( article.parent_id );
      const grandParent = getArticle( parent.parent_id );
      return `${ grandParent.title }/${ parent.title }/${ article.title }`;
    }
  }

  useEffect(() => {
    const articlesJoined = articles.map( (article : TArticle) => ({ 
      ...article, 
      relativePath: getRelativePath( article )
    }));
    setArticlesJoined( articlesJoined );
  }, [articles]);

  useEffect(() => {
    setArticles( dummyArticles );
  }, []);

  return {
    articles : articlesJoined
  }
}