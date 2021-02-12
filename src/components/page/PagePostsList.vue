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
    ...mapGetters(['settings', 'getCategoryPathByName']),
  },
  head() {
    let [title, description] = [
      '',
      'プログラマー TigRig の技術情報備忘録。デスクトップアプリ開発や Web アプリ開発、ゲーム制作など様々なジャンルの技術情報を投稿しております。',
    ]

    const path = this.$route.path
    if (path !== '/') {
      const categoryName = this.getCategoryPathByName(
        path.substring(1, path.length)
      )
      title = `記事一覧（${categoryName}）`
      description = `${categoryName}の記事一覧ページです。`
    }

    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        // Open Graph
        {
          hid: 'og:title',
          property: 'og:title',
          content: title || 'Toragramming',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.settings.url + path,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.settings.url + '/preview.png',
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title || 'Toragramming',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.settings.url + '/preview.png',
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: title || 'Toragramming',
        },
      ],
    }
  },
})
</script>
