import weaviate, { WeaviateClient } from "weaviate-client"
import { z } from 'zod'


export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig()

const client: WeaviateClient = await weaviate.connectToWCS(
  config.weaviateURL,
  {
    authCredentials: new weaviate.ApiKey(config.weaviateToken),
    headers: {
      'X-OpenAI-Api-Key': config.openai,
    }
  }
)

const responseSchema = z.object({
  query: z.string(),
})

async function vectorSearch(query:string) {
  
}

  return defineEventHandler<{query: { query: string } }>(async (event) => {
  
    const result = await getValidatedQuery(event, body => responseSchema.safeParse(body))
    if (!result.success)
      throw result.error.issues
  
    const searchTerm = result.data.query
  
    return searchTerm
  })
})