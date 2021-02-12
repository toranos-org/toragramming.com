<template>
  <div class="flex flex-wrap-reverse">
    <div
      class="w-full py-4 lg:pt-8 lg:pb-4 dark:border-gray-800"
      :class="{
        'lg:w-3/4': !document.fullscreen,
      }"
    >
      <article class="prose dark:prose-dark max-w-none lg:px-8">
        <div v-if="document.category" class="mb-4">
          <AppCategoryBadge
            v-for="categoryName in getCategoryPathByName(
              document.category
            ).split('/')"
            :key="categoryName"
            class="mr-4 bg-primary-500 dark:bg-primary-700"
          >
            {{ categoryName }}
          </AppCategoryBadge>
        </div>
        <h1 class="flex items-center justify-between">
          {{ document.title }}
          <Badge v-if="document.badge">{{ document.badge }}</Badge>
        </h1>
        <div class="text-sm text-right">
          <fa :icon="faCalendarCheck" />
          <span>{{ postedDate.create }}</span>
          <span class="px-1"></span>
          <fa :icon="faSyncAlt" />
          <time :datetime="document.updatedAt" itemprop="modified">{{
            postedDate.update
          }}</time>
        </div>
        <div v-if="document.subtitle" class="-mt-4">
          <p class="text-gray-600 dark:text-gray-400">
            {{ document.subtitle }}
          </p>
        </div>
        <div v-if="document.thumbnail" class="-mt-4">
          <AppThumbnail
            :title="`${document.title}-thumbnail`"
            :thumbnail="document.thumbnail"
          />
        </div>
        <NuxtContent :document="document" />
      </article>
      <AppPrevNext :prev="prev" :next="next" />
      <AppTocButton :toc="document.toc" />
    </div>
    <AppSidebar v-if="!document.fullscreen" :toc="document.toc" />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

import { faCalendarCheck, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

import AppCopyButton from '~/components/app/AppCopyButton'

export default {
  props: {
    document: {
      type: Object,
      required: true,
    },
    prev: {
      type: Object,
      required: false,
      default: () => {},
    },
    next: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(['settings', 'getCategoryPathByName']),
    postedDate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      const create = new Date(this.document.createdAt).toLocaleDateString(
        this.$i18n.locale,
        options
      )
      const update = new Date(this.document.updatedAt).toLocaleDateString(
        this.$i18n.locale,
        options
      )
      return {
        create,
        update,
      }
    },
    faCalendarCheck() {
      return faCalendarCheck
    },
    faSyncAlt() {
      return faSyncAlt
    },
  },
  mounted() {
    if (this.document.version) {
      localStorage.setItem(
        `document-${this.document.slug}-version`,
        this.document.version
      )
    }

    setTimeout(() => {
      const blocks = document.getElementsByClassName('nuxt-content-highlight')

      for (const block of blocks) {
        const CopyButton = Vue.extend(AppCopyButton)
        const component = new CopyButton().$mount()
        block.appendChild(component.$el)
      }
    }, 100)
  },
  head() {
    const metaTitle = `${this.document.title} - ${this.settings.title}`
    const thumbnail = this.document.thumbnail
      ? `${this.settings.url}/${
          this.document.thumbnail.light || this.document.thumbnail
        }`
      : `${this.settings.url}/default-thumbnail.png`
    return {
      title: this.document.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.document.description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: metaTitle },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.document.description,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.settings.url + this.document.to,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: thumbnail,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: metaTitle,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.document.description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: thumbnail,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: metaTitle,
        },
      ],
    }
  },
}
</script>
