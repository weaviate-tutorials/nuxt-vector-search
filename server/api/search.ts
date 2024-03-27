import weaviate, { WeaviateClient } from "weaviate-client"
import { z } from 'zod'

const responseSchema = z.object({
  query: z.string(),
})

export default defineEventHandler<{query: { query: string } }>(async (event) => {
  const config = useRuntimeConfig(event)

  const client: WeaviateClient = await weaviate.connectToWCS(
    config.weaviateURL,
    {
      authCredentials: new weaviate.ApiKey(config.weaviateToken),
      headers: {
        'X-OpenAI-Api-Key': config.openai,
        'X-Cohere-Api-Key': config.cohere, 
      }
    }
  )

  const result = await getValidatedQuery(event, body => responseSchema.safeParse(body))
  if (!result.success)
    throw result.error.issues

  // User object is validated and typed!
  const searchTerm = result.data.query
  const myCollection = client.collections.get('TrackSearcher')

  const response = await myCollection.query.nearText(searchTerm, {
    limit: 5
  })

  return response.objects
})
