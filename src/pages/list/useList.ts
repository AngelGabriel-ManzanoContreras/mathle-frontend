import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import fetchData from "../../logic/utils/fetch";
import { TArticleJoined } from "../../logic/types/TArticle";

export default function useList() {
  const { id } = useParams();
  const [ listName, setListName ] = useState<string | null>(null);
  const [ listItems, setListItems ] = useState([]);
  const navigate = useNavigate();

  const getRelativePath = ( article : TArticleJoined ) => {
    let relativePath = `${ article.ID_Article }:${ article.article_title }`;

    if ( article.type >= 2 && article.ID_Parent )
      relativePath = `${ article.parent_id }:${ article.parent_title }/${ relativePath }`;

    if ( article.type === 3 && article.grandparent_id )
      relativePath = `${ article.grandparent_id }:${ article.grandparent_title }/${ relativePath }`;

    return relativePath;
  }

  const getList = async () => {
    const response = await fetchData(`list/inf/${id}`);
    if ( !response ) {
      navigate("/explore");
    }

    if ( response ) {
      const data = await response.data;
      setListName(data.list_name);
      const formattedArticles = data.items.map( (article : TArticleJoined) => ({
        ...article,
        relativePath: getRelativePath( article )
      }));
      setListItems( formattedArticles || []);
    }
  }

  useEffect(() => {
    if (id) {
      getList();
    } else {
      navigate("/explore");
    }
  }, [id]);

  return {
    listName,
    listItems,
  }
}
