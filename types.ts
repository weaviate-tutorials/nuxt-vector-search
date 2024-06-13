import weaviate, { type GenerativeObject, type WeaviateObject } from 'weaviate-client'

export type WikipediaCollection = {
    title: string,
    description: string,
    url: string
  }
  
export type GenSearchResult = {
    response: GenerativeObject<WikipediaCollection>
  
  }

export type SearchResult = {
    response: WeaviateObject<WikipediaCollection>
  }
