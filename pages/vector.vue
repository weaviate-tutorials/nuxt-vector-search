<template>
    <main>
      <div class="items-center justify-center flex pt-4">
        <img class="w-36" src="@/public/logo.png">
      </div>
      <h1 class="text-4xl pt-5 font-bold text-black text-center">
        Vector Search with Weaviate
      </h1>
  
      <div class="items-center pb-6 pt-10 p-8">
        <h2 class="sr-only">Steps</h2>
  
        <div class="items-center flex justify-center">
          <p class="text-center text-m">
            Search through what ever you want! 
          </p>
        </div>
      </div>
  
      <div class="justify-center items-center">
        <div class="flex items-center justify-center pt-3">
          <label for="Search" class="sr-only"> Search </label>
  
          <input v-model="searchTerm" type="text" id="SearchTerm" placeholder="what are you looking for?"
            class="w-2/3 rounded-md border-gray-200 bg-slate-300 py-2.5 pl-4 pe-10 shadow-sm sm:text-sm placeholder:text-gray-800" />
        </div>
        <p class="item-center flex justify-center text-xs text-gray-600 pt-2 pb-4">
            try and search for "posts on animals"
          </p>
  
        <div class="flex items-start justify-center pt-3 gap-2">
  
          <button @click="submitSearch()"
            class="inline-block rounded border border-white bg-black px-12 py-3 text-sm font-medium text-lime-500 transition hover:border-black hover:bg-lime-500 hover:text-black focus:outline-none focus:ring focus:ring-yellow-400">
            Search
          </button>
        </div>
  
        <div v-if="searchResult" class="flex items-start justify-center">
          <div
            class="item-start absolute flex z-10 mt-2 w-[750px] divide-y divide-gray-100 rounded-md border border-gray-100 bg-slate-200 shadow-lg"
            role="menu">
            <div class="p-2">
              <strong class="block pb-5 text-xs font-bold  text-black">
                Results
              </strong>
              <div>
              </div>
              <div v-for="result in searchResult.objects">
                <div class="space-y-4">
                  <a class="font-medium pt-4 underline" :href="result.properties.url">
                        {{ result.properties.title }} 
                  </a>
                      <h1 class="-translate-y-2 w-full">
                        {{ result.properties.text }} 
                      </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="loading" class="flex items-start justify-center">
          <svg aria-hidden="true" class="w-8 h-8 my-2 text-gray-200 animate-spin fill-lime-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    </div>
      </div>
  
    </main>
  </template>
  
  
  <script setup lang="ts">
  import { type WeaviateReturn } from 'weaviate-client';
  import { type WikipediaCollection, type SearchResult } from '~/types';
  const searchTerm = ref('')
  const loading = ref(false)
  
  const searchResult = ref<WeaviateReturn<WikipediaCollection> | null >()

  async function submitSearch() {
    searchResult.value = null
    loading.value = true
    searchResult.value = await $fetch(`/api/search?query=${searchTerm.value}`) 
    loading.value = false
  }
  
  </script>
  