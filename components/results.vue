<template>
    <div v-if="searchResult" class="flex items-start justify-center">
        <div class="item-start absolute flex z-10 mt-2 w-[750px] divide-y divide-gray-100 rounded-md border border-gray-100 bg-slate-200 shadow-lg"
            role="menu">
            <div class="p-2">
                <strong class="block p-2 text-xs font-bold uppercase text-black">
                    results
                </strong>
                <div>
                </div>
                <div v-for="item in searchResult">
                    <div class="space-y-4">
                        <details class="group [&_summary::-webkit-details-marker]:hidden" open>
                            <summary
                                class="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg text-sm p-4 text-gray-900">
                                <h2 class="font-medium">
                                    {{ item.properties.title }} by {{ item.properties.artist }}
                                </h2>                
                            </summary>
                        
                        </details>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['searchResult']);

</script>