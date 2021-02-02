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
        'grid-cols-3',
        'gap-4',
      ]"
    >
      <div v-if="logo" class="">
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
      <div class=""></div>
      <div v-if="settings.copyright" class="flex items-end justify-end text-sm">
        {{ `© ${settings.copyright}` }}
      </div>
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
