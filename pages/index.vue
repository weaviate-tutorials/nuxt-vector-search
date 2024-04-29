<template>
    <main>
      <Cover />
      <Search @run-search="submitSearch" />
      <Loading v-if="loading" />
      <Results :search-result="searchResult" />
    </main>
  </template>
  
  
  <script setup lang="ts">
  import { type TrackSearchResult} from "../types";
  const loading = ref(false)
  
  const searchResult = ref<TrackSearchResult>()
  
  async function submitSearch(searchTerm: string) {
    loading.value = true
    searchResult.value = await $fetch(`/api/search?query=${searchTerm}`)
    loading.value = false
  }
  
  </script>
  