<template>
  <div v-if="toc.length">
    <nav>
      <p
        v-if="title"
        class="mb-3 lg:mb-2 text-gray-500 uppercase tracking-wider font-bold text-sm lg:text-xs"
      >
        {{ title }}
      </p>
      <scrollactive
        highlight-first-item
        active-class="text-primary-500"
        :offset="0"
        tag="ul"
      >
        <li
          v-for="link of toc"
          :key="link.id"
          class="text-gray-700 dark:text-gray-300"
          :class="{
            'border-t border-dashed border-gray-400 dark:border-gray-700 first:border-t-0 font-bold':
              link.depth === 2,
          }"
        >
          <a
            :href="`#${link.id}`"
            class=""
            :class="[
              'block',
              'text-sm',
              'scrollactive-item',
              'transition-padding',
              'ease-in-out',
              'duration-300',
              'hover:text-primary-400',
              'dark-hover:text-primary-700',
              {
                'py-2': link.depth === 2,
                'ml-4 pb-2': link.depth === 3,
              },
            ]"
          >
            {{ link.text }}
          </a>
        </li>
      </scrollactive>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters(['settings']),
  },
}
</script>
