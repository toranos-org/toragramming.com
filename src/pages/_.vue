<template>
  <PagePostsList v-if="!isPost" :posts="posts" />
  <PagePost v-else :document="document" :prev="prev" :next="next" />
</template>

<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import Vue from 'vue'

export default Vue.extend({
  name: 'PageSlug',
  middleware({ app, params, redirect }) {
    if (params.pathMatch === 'index') {
      redirect(app.localePath('/'))
    }
  },
  async asyncData({ $content, params, app, error }) {
    const categoryPathRegex = params.pathMatch
      ? `^${params.pathMatch}(/.+)?`
      : ''
    // カテゴリー下の記事一覧を取得
    const posts = await $content(app.i18n.locale, { deep: true })
      .where({ category: { $regex: categoryPathRegex } })
      .only([
        'title',
        'description',
        'thumbnail',
        'slug',
        'to',
        'category',
        'createdAt',
      ])
      .sortBy('createdAt', 'desc')
      .fetch()

    if (posts.length > 0) {
      return {
        isPost: false,
        posts,
      }
    }

    // 記事取得
    const path = `/${app.i18n.locale}/${params.pathMatch || 'index'}`
    const [document] = (await $content({ deep: true })
      .where({ path })
      .fetch()) as IContentDocument[]

    if (document) {
      const [prev, next] = (await $content(app.i18n.locale, { deep: true })
        .only(['title', 'slug', 'to', 'thumbnail'])
        .sortBy('createdAt', 'asc')
        .surround(document.slug, { before: 1, after: 1 })
        .fetch()) as IContentDocument[]

      return {
        isPost: true,
        document,
        prev,
        next,
      }
    } else {
      return error({ statusCode: 404, message: 'Page not found' })
    }
  },
})
</script>
