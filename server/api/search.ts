import weaviate, { WeaviateClient } from "weaviate-client"
import { z } from 'zod'

export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig()

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(config.weaviateHostURL,{
    authCredentials: new weaviate.ApiKey(config.weaviateReadToken),
    headers: {
      'X-Cohere-Api-Key': config.cohereApiKey
    }
  }
)

const responseSchema = z.object({
  query: z.string(),
})

async function vectorSearch(searchTerm:string) {
const myCollection = client.collections.get('Wikipedia')
const response = await myCollection.query.nearText(searchTerm, { autoLimit: 2 })
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