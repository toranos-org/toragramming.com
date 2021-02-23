<template>
  <div
    v-if="prev || next"
    class="grid grid-cols-2 gap-2 lg:px-8 pt-4 border-t dark:border-gray-800 lg:border-t-0"
  >
    <NuxtLink
      v-if="prev"
      :to="localePath(prev.to)"
      class="grid grid-cols-2 border dark:border-gray-800 rounded"
    >
      <div
        class="flex items-center w-full relative border-r dark:border-gray-800"
      >
        <AppThumbnail
          :title="`${prev.title}-thumbnail`"
          :thumbnail="prev.thumbnail"
          :img-dir="prev.thumbnail ? '/assets' + prev.to : ''"
        />
        <div
          class="absolute left-0 top-0 m-1 p-1 rounded-full bg-gray-200 dark:bg-gray-800"
        >
          <IconArrowLeft class="w-4 h-4" />
        </div>
      </div>
      <div
        class="text-primary-500 font-bold flex items-center justify-start p-1"
      >
        <span class="line-clamp-2">{{ prev.title }}</span>
      </div>
    </NuxtLink>

    <span v-else>&nbsp;</span>

    <NuxtLink
      v-if="next"
      :to="localePath(next.to)"
      class="grid grid-cols-2 border dark:border-gray-800 rounded"
    >
      <div
        class="text-primary-500 font-bold flex items-center justify-start p-1"
      >
        <span class="line-clamp-2">{{ next.title }}</span>
      </div>
      <div
        class="flex items-center w-full relative border-l dark:border-gray-800"
      >
        <AppThumbnail
          :title="`${next.title}-thumbnail`"
          :thumbnail="next.thumbnail"
          :img-dir="next.thumbnail ? '/assets' + next.to : ''"
        />
        <div
          class="absolute top-0 right-0 m-1 p-1 rounded-full bg-gray-200 dark:bg-gray-800"
        >
          <IconArrowRight class="w-4 h-4" />
        </div>
      </div>
    </NuxtLink>

    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    ...mapGetters(['settings']),
  },
}
</script>
