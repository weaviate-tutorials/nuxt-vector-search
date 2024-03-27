import weaviate, { type WeaviateObjectType } from 'weaviate-client'

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
    year: number,
    rank: number,
    title: string
    artist: string
    album: string
  }

export type TrackSearchResult = {
    response: WeaviateObjectType<TrackSearcher>
  }

export type SearchResult = {
    response: WeaviateObjectType<JeopartyCollection>
  }
