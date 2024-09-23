import weaviate, { WeaviateClient } from "weaviate-client"
import { type WikipediaCollection } from "~/types"
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
  const wikiCollection = client.collections.get('Wikipedia')

  const response = await wikiCollection.generate.nearText(searchTerm, {
    groupedTask: `pretend you are a primary school teacher and explain the answer to ${searchTerm} to me in the
    the most basic english and a french translation at the end `,
  },{
    limit: 5
  }
  )

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