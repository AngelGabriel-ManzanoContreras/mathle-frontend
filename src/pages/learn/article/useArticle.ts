import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

import fetchData from "../../../logic/utils/fetch";

export default function useArticle() {
  const [ ID, setID ] = useState(null);
  const [ theresUserID, setTheresUserID ] = useState<number>(0);
  const [ article, setArticle ] = useState(null);
  const { subtopic, topic } = useParams();
  const [ read, setRead ] = useState(false);

  const fetchArticle = async () => {
    const query = subtopic || topic;
    if (!query) return;

    const id = query.split(':')[0];
    if (!id) return;

    const response = await fetchData( `article/${id}` );
    if ( response?.status !== 200 ) return;

    setArticle( response.data );
    setID( id );
  }

  const markAsRead = async () => {
    if ( !ID ) return;

    const id_user = localStorage.getItem('id_user');
    if ( id_user ) {
      //todo: implement the progress update
    }

    localStorage.setItem(`read:${ ID }`, 'true');
    setRead(true);
  }

  const unmarkAsRead = async () => {
    if ( !ID ) return;

    const id_user = localStorage.getItem('id_user');
    if ( id_user ) {
      //todo: implement the progress update
    }

    setRead(false);
  }

  const isRead = () => {
    const read = localStorage.getItem(`read:${ ID }`);
    if ( read ) setRead(true);
  }

  useEffect(() => {
    if (!subtopic || !topic) return;
    fetchArticle();

    isRead();

  }, [ subtopic, topic ]);

  useEffect(() => {
    if ( !ID ) return;
    isRead();
  }, [ ID ]);

  return {
    ...article,
    read,
    theresUserID,
    markAsRead,
    unmarkAsRead
  }
}
