import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import fetchData from "../../../../logic/utils/fetch";

export default function useAddToList() {
  const [ searchParams ] = useSearchParams();
  const [ articleId, setArticleId ] = useState<string | null>(null);
  const [ userId, setUserId ] = useState<string | null>(null);
  const [ lists, setLists ] = useState<string[]>([]);
  const [ articleData, setArticleData ] = useState<any | null>(null);
  const [ displayForm, setDisplayForm ] = useState<boolean>(false);

  const [ listName, setListName ] = useState<string>('');
  const [ isPrivate, setIsPrivate ] = useState<boolean>(false);

  const fetchLists = async () => {
    const data = await fetchData(`list/${ userId }`, 'GET');
    setLists(data.data);
  }

  const fetchArticleData = async () => {
    if (!articleId) return;
    const res = await fetchData(`article/${ articleId }`, 'GET');
    setArticleData(res?.data);
  }

  const addToList = async (listId: string) => {
    if (!articleId || !userId) return;
    const res = await fetchData('list/add', 'POST', { id_article: articleId, id_list: listId });
    if ( res ) alert('Article added to list');
    else alert('Failed to add article to list');
  }

  const createList = () => { setDisplayForm(true); }

  const submitList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!listName) return;
    const res = await fetchData('list', 'POST', { id_user: userId , list_name: listName, is_private : isPrivate });
    if ( res ) alert('List created');
    else alert('Failed to create list');

    setDisplayForm(false);
    fetchLists();
  }
  
  const cancelCreateList = () => { setDisplayForm(false); }

  useEffect(() => {
    const articleId = searchParams.get('aid');
    const userId = searchParams.get('uid');

    if (articleId) setArticleId(articleId);
    if (userId) setUserId(userId);

  }, [ searchParams ]);

  useEffect(() => {
    fetchLists();
  }, [ userId ]);

  useEffect(() => {
    fetchArticleData();
  }, [ articleId ]);

  return {
    articleData,
    lists,
    displayForm,
    addToList,
    createList,
    cancelCreateList,
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => { setListName(e.target.value); },
    onPrivateChange: (e: React.ChangeEvent<HTMLInputElement>) => { setIsPrivate(e.target.checked); },
    submitList
  }
}