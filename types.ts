import weaviate, { type GenerateObject, type GenerativeReturn, type WeaviateObjectType } from 'weaviate-client'

export type QuoteType = {
    quote: string;
    author: string;
    distance: number;
  };

export type JeopartyCollection = {
    question: string,
    answer: string
  }

export type TrackSearcher =  {
    title: string,
    artist: string,
    album: string,
    year: number,
    rank: number
  }
  
export type TrackSearchResult = {
    response: GenerateObject<TrackSearcher>
  
  }

export type SearchResult = {
    response: WeaviateObjectType<JeopartyCollection>
  }
