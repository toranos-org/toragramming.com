<template>
  <footer
    class="pt-4 pb-4 relative w-full border-t dark:border-gray-800 bg-white dark:bg-gray-900 z-20"
  >
    <div
      :class="[
        'h-full',
        'w-full',
        'container',
        'mx-auto',
        'px-4',
        'lg:px-12',
        'grid',
        'lg:grid-cols-4',
        'gap-4',
      ]"
    >
      <div>
        <img
          :src="logo.light"
          class="h-8 max-w-full light-img"
          :alt="settings.title"
        />
        <img
          :src="logo.dark"
          class="h-8 max-w-full dark-img"
          :alt="settings.title"
        />
      </div>
      <ul
        class="flex gap-4 items-center lg:col-span-2 text-sm dark:text-gray-600"
      >
        <li><a class="hover:underline" href="/contact">お問い合わせ</a></li>
        <li>
          <a class="hover:underline" href="/privacy">プライバシーポリシー</a>
        </li>
        <li><a class="hover:underline" href="/law">免責事項</a></li>
        <li><a class="hover:underline" href="/sitemap.xml">サイトマップ</a></li>
      </ul>
      <p class="lg:place-self-end text-xs">
        {{ `© ${settings.copyright}` }}
      </p>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['settings', 'githubUrls']),
    logo() {
      if (!this.settings.logo) {
        return
      }

      if (typeof this.settings.logo === 'object') {
        return this.settings.logo
      }

      return {
        light: this.settings.logo,
        dark: this.settings.logo,
      }
    },
  },
}
</script>
