import weaviate, { WeaviateClient } from "weaviate-client"
import { type WikipediaCollection } from "~/types"
import { z } from 'zod'


export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig()

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(config.weaviateHostURL,{
    authCredentials: new weaviate.ApiKey(config.weaviateAdminKey),
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
  const prompt = `you're my assistant, i want to impress people on a webinar,
   what item in this list is the most impressive? given my question ${searchTerm}`


  const WikipediaCollection = client.collections.use("Wikipedia")

  const response = await WikipediaCollection.generate.nearText(searchTerm,{
    groupedTask: prompt
  }, {
    limit: 4,
    includeVector: true
  })

  console.log(response.objects[0].properties.title)
  console.log(response.objects[0].vectors)

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