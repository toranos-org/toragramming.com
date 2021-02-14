<template>
  <div class="w-full py-4 lg:pt-8 lg:pb-4 dark:border-gray-800">
    <article class="prose dark:prose-dark max-w-none lg:px-8">
      <h1>お問い合わせ</h1>
      <form class="mt-16">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label :class="labelStyles" for="your-name">
              お名前（ハンドルネーム可）
            </label>
            <input name="your-name" :class="inputStyles" type="text" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label :class="labelStyles" for="email"> E-mail </label>
            <input name="email" :class="inputStyles" type="email" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label :class="labelStyles" for="message"> Message </label>
            <textarea name="message" :class="textareaStyles"></textarea>
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3">
            <button :class="buttonStyles" type="button">Send</button>
          </div>
        </div>
      </form>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters(['settings']),
    labelStyles() {
      return [
        'block',
        'tracking-wide',
        'text-gray-700',
        'dark:text-gray-300',
        'text-sm',
        'font-bold',
        'dark:font-normal',
        'mb-2',
      ]
    },
    inputStyles() {
      return [
        'appearance-none',
        'block',
        'w-full',
        'bg-gray-200',
        'text-gray-700',
        'border-2',
        'border-gray-400',
        'rounded',
        'py-3',
        'px-4',
        'mb-3',
        'leading-tight',
        'focus:outline-none',
        'focus:ring',
        'focus:border-blue-500',
      ]
    },
    textareaStyles() {
      return [
        'no-resize',
        'appearance-none',
        'block',
        'w-full',
        'bg-gray-200',
        'text-gray-700',
        'border-2',
        'border-gray-400',
        'rounded',
        'py-3',
        'px-4',
        'mb-3',
        'leading-tight',
        'focus:outline-none',
        'focus:ring',
        'focus:border-blue-500',
        'h-48',
        'resize-none',
      ]
    },
    buttonStyles() {
      return [
        'shadow',
        'bg-primary-500',
        'hover:bg-primary-600',
        'border-2',
        'border-gray-400',
        'focus:outline-none',
        'focus:ring',
        'focus:border-blue-500',
        'text-white',
        'py-2',
        'px-4',
        'rounded',
      ]
    },
  },
  head() {
    const [title, description] = ['お問い合わせ', 'お問い合わせ']

    const metaTitle = `${title} - ${this.settings.title}`

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
          content: metaTitle,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.settings.url + this.$route.path,
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
          content: metaTitle,
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
          content: metaTitle,
        },
      ],
    }
  },
})
</script>
