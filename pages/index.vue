<template>
    <main>
      <Cover />
      <Search @run-search="submitSearch" />
      <Loading v-if="loading" />
      <h1 class="text-4xl pt-5 font-bold text-black text-center">
        {{ searchResult }}
      </h1>
      <!-- <Results :search-result="searchResult" /> -->
    </main>
  </template>
  
  
  <script setup lang="ts">
  const loading = ref(false)
  
  const searchResult = ref()
  
  async function submitSearch(searchTerm: string) {
    loading.value = true
    searchResult.value = await $fetch(`/api/search?query=${searchTerm}`)
    loading.value = false
  }
  
  </script>
  