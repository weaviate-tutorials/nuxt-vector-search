import weaviate, { WeaviateClient } from "weaviate-client"
import { z } from 'zod'


export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig()

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(config.weaviateHostURL,{
    authCredentials: new weaviate.ApiKey(config.weaviateReadKey),
    headers: {
      'X-OpenAI-Api-Key': config.openaiApiKey,
      'X-Cohere-Api-Key': config.cohereApiKey
    }
  }
)

const responseSchema = z.object({
  query: z.string(),
})


async function RAG(searchTerm:string) {
  const myCollection = client.collections.get('Wikipedia')
const response = await myCollection.generate.nearText(searchTerm,{
  groupedTask: `you are a middle school teacher, use the information below to answer ${searchTerm} and use 
  simple words`,
} ,{ limit: 5 })
return response
}

  return defineEventHandler<{query: { query: string } }>(async (event) => {
  
    const result = await getValidatedQuery(event, body => responseSchema.safeParse(body))
    if (!result.success)
      throw result.error.issues
  
    const searchTerm = result.data.query
  
    return await RAG(searchTerm)
  })
})