<template>
  <main class="h-screen">
    <div class="items-center justify-center flex pt-4">
      <img class="w-36" src="@/public/logo.png">
    </div>
    <h1 class="text-4xl pt-5 font-bold text-black text-center">
      Agent Wade
    </h1>

    <div className="flex p-8 w-full items-center justify-center">


      <div className="h-60 w-[640px] bg-gray-400 rounded-md">
        <div className="flex justify-between">
          <p
            className="w-16 h-6 mt-2 ml-2 block text-center whitespace-nowrap items-center justify-center rounded-lg translate-y-8 transform  bg-white px-2.5 py-0.5 text-sm text-black">
            Results
          </p>
          <p
            className="w-24 h-6 mt-2 mr-2 block text-center whitespace-nowrap items-center justify-end rounded-lg translate-y-8 transform  bg-white px-2.5 py-0.5 text-sm text-black">
            Retry
          </p>
        </div>
        <span alt="Certainty: " className='block object-cover w-full h-full rounded-lg'> </span>



      </div>
    </div>

    <div className="flex grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8 p-8 w-full items-center justify-center">

      <div>

      </div>

      <div className="h-20 w-50 bg-gray-400 rounded-md">
        <div className="flex justify-between">
          <p
            className="w-16 h-6 mt-2 ml-2 block text-center whitespace-nowrap items-center justify-center rounded-lg translate-y-8 transform  bg-white px-2.5 py-0.5 text-sm text-black">
            Success
          </p>
          <p
            className="w-24 h-6 mt-2 mr-2 block text-center whitespace-nowrap items-center justify-end rounded-lg translate-y-8 transform  bg-white px-2.5 py-0.5 text-sm text-black">
            Dismiss
          </p>
        </div>
        <span alt="Certainty: " className='block object-cover w-full h-full rounded-lg'> </span>



      </div>

      <div className="h-20 w-50 bg-gray-400 rounded-md">
        <div className="flex justify-between">
          <p
            className="w-16 h-6 mt-2 ml-2 block text-center whitespace-nowrap items-center justify-center rounded-lg translate-y-8 transform  bg-white px-2.5 py-0.5 text-sm text-black">
            Failure
          </p>
          <p
            className="w-24 h-6 mt-2 mr-2 block text-center whitespace-nowrap items-center justify-end rounded-lg translate-y-8 transform  bg-white px-2.5 py-0.5 text-sm text-black">
            Retry
          </p>
        </div>
        <span alt="Certainty: " className='block object-cover w-full h-full rounded-lg'> </span>



      </div>
    </div>

    <div class="items-center justify-end pb-6 pt-10 p-8">

      <div class="items-center flex justify-center">
        <p class="text-center text-m">
          How can i help?
        </p>
      </div>
    </div>

    <div class="flex justify-end items-center w-2/3">
      <div class="w-2/3 flex items-center justify-end pt-3">
        <label for="Search" class="sr-only"> Search </label>

        <input v-model="searchTerm" type="text" id="SearchTerm" placeholder="what are you looking for?"
          class="w-2/3 rounded-md border-gray-200 bg-slate-300 py-2.5 pl-4 pe-10 shadow-sm sm:text-sm placeholder:text-gray-800" />
      </div>
      <!-- <p class="item-center flex justify-center text-xs text-gray-600 pt-2 pb-4">
        try and ask for "a newsletter on safari animals"
      </p> -->

      <div class="flex items-center justify-center pt-3 gap-2">

        <button @click="submitSearch()"
          class="inline-block items-center justify-center rounded-md border border-white bg-black py-2.5 pl-4 pe-5 text-sm font-medium text-lime-500 transition hover:border-black hover:bg-lime-500 hover:text-black focus:outline-none focus:ring focus:ring-yellow-400">
          Act
        </button>
      </div>

      <!-- <div class="grid grid-cols-3">
        <div v-if="searchResult" class="flex items-start justify-center col-span-3 pt-4">
          <div
            class="item-start flex z-10 mt-2 w-[750px] divide-y divide-gray-100 rounded-md border border-gray-100 bg-slate-200 shadow-s"
            role="menu">
            <div class="p-2">
              <vue-markdown-it :source="searchResult.generated" />
              <div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="searchResult" class="flex justify-center col-span-3 translate-y-[1rem] pb-10">
          <div class="flex z-10 mt-2 w-[750px] divide-gray-100 rounded-md border border-gray-100 bg-slate-200 shadow-s"
            role="menu">
            <div class="p-2">
              <p class="pt-2 font-bold">ℹ️ Sources</p>
              <p class="pb-2"> Find out what powered the response from your LLM</p>
              <ol v-for="result in searchResult.objects">
                <li class="space-y-4">
                  <a class="underline" :href="result.properties.url"> {{ result.properties.title }} </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div> -->


      <div v-if="loading" class="flex items-start justify-center">
        <svg aria-hidden="true" class="w-8 h-8 my-2 text-gray-200 animate-spin fill-lime-600" viewBox="0 0 100 101"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor" />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill" />
        </svg>
      </div>
    </div>

  </main>
</template>
  
  
<script setup lang="ts">
import { type SearchResult } from '~/types';
import { VueMarkdownIt } from '@f3ve/vue-markdown-it';

const searchTerm = ref('')
const loading = ref(false)

const searchResult = ref()

async function submitSearch() {
  searchResult.value = null
  loading.value = true
  searchResult.value = await $fetch(`/api/rag?query=${searchTerm.value}`)
  loading.value = false
}


</script>
  