<template>
  <div
    class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-8"
  >
    <article v-for="post in posts" :key="post.slug">
      <NuxtLink :to="localePath(post.to)">
        <div class="rounded overflow-hidden shadow dark:shadow-white my-2">
          <AppThumbnail
            :title="`${post.title}-thumbnail`"
            :thumbnail="post.thumbnail"
          />
          <div class="px-6 py-4 border-t dark:border-gray-800">
            <div class="font-bold text-lg">
              {{ post.title }}
            </div>
          </div>
          <div
            v-if="post.category"
            class="px-6 pb-4 text-xs font-semibold text-gray-800"
          >
            <AppCategoryBadge
              class="text-gray-700 dark:text-gray-400 bg-gray-300 dark:bg-gray-800"
            >
              {{ getCategoryPathByName(post.category).replace('/', ' > ') }}
            </AppCategoryBadge>
          </div>
        </div>
      </NuxtLink>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  props: {
    posts: {
      type: Array,
      default: () => null,
    },
  },
  computed: {
    ...mapGetters(['getCategoryPathByName']),
  },
})
</script>
