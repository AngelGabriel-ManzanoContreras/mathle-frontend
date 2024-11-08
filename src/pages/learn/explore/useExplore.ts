import { useState, useEffect } from "react";

import fetchData from "../../../logic/utils/fetch";
import { TArticle, TArticleJoined } from "../../../logic/types/TArticle";

export default function useExplore() {
  const [ articles, setArticles ] = useState( [] );
  const [ articlesJoined, setArticlesJoined ] = useState<Array<TArticle & { relativePath?: string }>>([]);
  const [ query, setQuery ] = useState( '' );
  const [ queryUsed, setQueryUsed ] = useState( false );
  const [ loading, setLoading ] = useState( true );

  const getRelativePath = ( article : TArticleJoined ) => {
    let relativePath = `${ article.ID_Article }:${ article.article_title }`;

    if ( article.type >= 2 && article.ID_Parent )
      relativePath = `${ article.parent_id }:${ article.parent_title }/${ relativePath }`;

    if ( article.type === 3 && article.grandparent_id )
      relativePath = `${ article.grandparent_id }:${ article.grandparent_title }/${ relativePath }`;

    return relativePath;
  }

  const fetchArticles = async () => {
    const response = await fetchData( 'explore', 'GET' );
    setQueryUsed( false );
    if ( response ) setArticles( response.data );
    else setLoading( false );
  }

  const fetchArticlesByQuery = async () => {
    if ( !query ) return;

    setLoading( true );
    
    const response = await fetchData( `explore/${ encodeURIComponent( query.toLocaleLowerCase() ) }`, 'GET' );
    if ( response ) { 
      const formattedArticles = response.data.map( (article : TArticleJoined) => ({
        ...article,
        relativePath: getRelativePath( article )
      }));

      setQueryUsed( true );
      setArticles( formattedArticles );
    }
    else {
      setLoading( false );
      setArticles( [] );
    }
  }

  const handleQueryChange = ( event : React.ChangeEvent<HTMLInputElement> ) => {
    setQuery( event.target.value );
  }

  const onSubmitQuery = ( event : React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    if ( !query ) return fetchArticles();
    fetchArticlesByQuery();
  }

  const onClearQuery = ( event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchArticles();
    setQuery( '' );
  }

  useEffect(() => {
    const articlesJoined = articles.map( (article : TArticleJoined) => ({ 
      ...article, 
      relativePath: getRelativePath( article )
    }));
    setArticlesJoined( articlesJoined );
    setLoading( false );
  }, [articles]);

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles : articlesJoined,
    loading,
    query,
    queryUsed,
    handleQueryChange,
    onSubmitQuery,
    onClearQuery
  }
}
