
<template>
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
            <button @click="$emit('runSearch', searchTerm)"
                class="inline-block rounded border border-white bg-black px-12 py-3 text-sm font-medium text-lime-500 transition hover:border-black hover:bg-lime-500 hover:text-black focus:outline-none focus:ring focus:ring-yellow-400">
                Search
            </button>
        </div>
    </div>
</template>

<script setup>

const numberX = ref(8)
const searchTerm = ref('')

</script>