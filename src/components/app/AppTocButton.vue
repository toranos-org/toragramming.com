<template>
  <div v-if="toc.length > 0" class="lg:hidden fixed z-30 bottom-4 right-4">
    <button
      :class="[
        'flex',
        'justify-center',
        'items-center',
        'w-12',
        'h-12',
        'rounded-full',
        'bg-gray-600',
        'dark:bg-gray-700',
        'text-gray-200',
        'dark:text-gray-300',
        { hidden: tocIsDisplayed },
      ]"
      @click.stop="tocIsDisplayed = !tocIsDisplayed"
    >
      <fa class="text-xl" :icon="faListUl" />
    </button>
    <div
      :class="[
        'px-8',
        'py-4',
        'w-80',
        'sm:w-96',
        'max-h-96',
        'border-2',
        'border-gray-400',
        'dark:border-gray-700',
        'bg-white',
        'dark:bg-gray-900',
        'overflow-auto',
        { hidden: !tocIsDisplayed },
      ]"
    >
      <button
        class="top-4 right-8 p-2 rounded-md z-40 absolute text-gray-700 dark:text-gray-300 focus:outline-none"
        aria-label="Table of contents"
        @click.stop="tocIsDisplayed = !tocIsDisplayed"
      >
        <IconX class="w-5 h-5" />
      </button>
      <AppToc :title="$t('toc.title')" :toc="toc" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { faListUl } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    title: {
      type: String,
      default: null,
    },
    toc: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tocIsDisplayed: false,
    }
  },
  computed: {
    ...mapGetters(['settings']),
    faListUl() {
      return faListUl
    },
  },
}
</script>
