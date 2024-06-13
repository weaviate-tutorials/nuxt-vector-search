# Vector Search and RAG with [Weaviate](https://weaviate.io/), Nuxt.js, [Cohere](https://cohere.com/) and [Open AI](https://openai.com/)

This repo should help get you started developing RAG Applications with Weaviate and Nuxt.js.

![Weaviate](https://github.com/weaviate-tutorials/nuxt-vector-search/blob/main/public/cover.png)

## Installation 

1. Clone the repo with the following command
    ```
    git clone https://github.com/weaviate-tutorials/nuxt-vector-search
    ```

2. Install the necessary project dependencies with the following command
    ```
    yarn install
    ```
3. Create a Weaviate instance on Weaviate Cloud Services as described in [this guide](https://weaviate.io/developers/weaviate/quickstart#step-2-create-an-instance)

4. Create a `.env` file and add the following keys
    - your Open AI API key as `NUXT_COHERE` (you can get this in your [Open AI settings](https://platform.openai.com/account/api-keys))
    - your Cohere API key as `NUXT_OPENAI` (you can get this in your [Cohere settings](https://dashboard.cohere.com/api-keys)
    - your Weaviate API key as `NUXT_WEAVIATE_TOKEN` (you can get this in your [Weaviate dashboard](https://console.weaviate.cloud/dashboard) under sandbox details)
    - your Weaviate host URL as `NUXT_WEAVIATE_URL` (you can get this in your [Weaviate dashboard](https://console.weaviate.cloud/dashboard) under sandbox details)
  
5. Import your data and initialize your collections with the following command
   ```
   # I will add details on how to import your Wiki data soon
   ``` 
5. Start your Nuxt.js app with the following command
    ```
    yarn dev
    ```

6. Search away!!

💫you can tweak the prompt for the generative search by [editing this line of code](https://github.com/weaviate-tutorials/nuxt-vector-search/blob/1f259625ea2a6ae99f4bef0f4072e0507c1d682c/server/api/rag.ts#L26)

## 📚 Resources
Learn more about Weaviate applications
- [Weaviate Generative Search](https://weaviate.io/developers/weaviate/modules/reader-generator-modules/generative-openai)
- [Vector Search](https://weaviate.io/developers/weaviate/search/similarity)
  
## 🤷🏾‍♂️ Troubleshooting
- Check out the [Weaviate Docs](https://weaviate.io/developers/weaviate)
- Open an [Issue](https://github.com/malgamves/vue-vector-search-demo/issues/new)
   
