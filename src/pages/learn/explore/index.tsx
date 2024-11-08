import useExplore from './useExplore';

import styles from './explore.module.css';
import Layout from '../../layout';

import ArticleCard from '../../../components/explore/article-card';
import SearchBar from '../../../components/explore/search-bar';

export default function Explore() {
  const { articles, loading, query, queryUsed, handleQueryChange, onSubmitQuery, onClearQuery } = useExplore();
  const errorMessage = `No articles found for "${ query }"`;

  return (
    <Layout>
      <h2>Explore</h2>

      <SearchBar 
        onSubmit={ onSubmitQuery }
        onChange={ handleQueryChange }
        onClear={ onClearQuery }
        value={ query }
      />

      {
        ( queryUsed && query ) && (
          <p>
            Showing results for: <strong>{ query }</strong>
          </p>
        )
      }

      <section className={ styles[`explore__articles`] }>
        { articles.map((article) => (
          <ArticleCard 
            key={ article.ID_Article } 
            { ...article }
          />
        )) }
        { loading && <p>Loading...</p> }
        { ( !loading && !articles.length ) && <p>{ errorMessage }</p> }
      </section>
      
    </Layout>
  )
}
