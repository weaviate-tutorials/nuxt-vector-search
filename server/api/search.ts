import weaviate, { WeaviateClient } from "weaviate-client"
import { z } from 'zod'
import { type WikipediaCollection } from "~/types"

export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig()

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(config.weaviateHostURL,{
    authCredentials: new weaviate.ApiKey(config.weaviateReadKey),
    headers: {
      'X-Cohere-Api-Key': config.cohereApiKey
    }
  }
)

const responseSchema = z.object({
  query: z.string(),
})

async function vectorSearch(searchTerm:string) {
  const wikiCollection = client.collections.get<WikipediaCollection>('Wikipedia')

  const response = await wikiCollection.query.nearText(searchTerm, {
    limit: 5,
    returnMetadata: ['distance']

  })

  return response

}

  return defineEventHandler<{query: { query: string } }>(async (event) => {
  
    const result = await getValidatedQuery(event, body => responseSchema.safeParse(body))
    if (!result.success)
      throw result.error.issues
  
    const searchTerm = result.data.query
  
    return await vectorSearch(searchTerm)
  })
})