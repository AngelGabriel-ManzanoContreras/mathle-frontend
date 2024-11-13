import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import fetchData from "../../../logic/utils/fetch";
import { TArticle } from "../../../logic/types/TArticle";


export default function useTopic() {
  const [ topicData, setTopicData ] = useState<TArticle | undefined>( undefined );
  const [ subtopics, setSubtopics ] = useState<object>( [] );
  const [ content, setContent ] = useState<string | undefined>( undefined );
  const { topic : topicParam, subject } = useParams();

  const fetchTopic = async ( id : string ) => {
    const res = await fetchData( `topic/${id}` );
    if ( res?.status === 200 ) {
      setTopicData( res.data.topic );
      setContent( res.data.content );
      const formattedSubtopics = formatSubtopics( res.data.subtopics );
      setSubtopics( formattedSubtopics );
    }
  }

  const formatSubtopics = ( subtopics : any ) => {
    return subtopics.map( (subtopic : any) => {
      return {
        title: subtopic.title,
        link: `/learn/${ subject }/${ topicParam }/${ subtopic.ID_Article }:${ subtopic.title }`.replace(/\s+/g, '-').toLocaleLowerCase()
      }
    });
  }

  useEffect(() => {
    if (topicParam) {
      const id = topicParam.split(':')[0];

      if ( id ) fetchTopic( id );
    }
  }, [topicParam]);

  return {
    topic : topicData,
    content,
    subtopics
  }
}
