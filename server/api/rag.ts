import weaviate, { WeaviateClient } from "weaviate-client"
import { z } from 'zod'


export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig()

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(config.weaviateURL,{
    authCredentials: new weaviate.ApiKey(config.weaviateToken),
    headers: {
      'X-OpenAI-Api-Key': config.openai,
      'X-Cohere-Api-Key': config.cohere
    }
  }
)

const responseSchema = z.object({
  query: z.string(),
})


async function RAG(searchTerm:string) {
  const myCollection = client.collections.get('Wikipedia')

 const response = await myCollection.generate.nearText(searchTerm, {
  groupedTask: `This is a list of articles resources related to ${searchTerm}, 
    what methods of ${searchTerm} do you recommend and how can I learn?`,
 },{limit: 6})

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