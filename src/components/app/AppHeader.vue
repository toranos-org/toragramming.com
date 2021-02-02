<template>
  <nav
    class="fixed top-0 z-40 w-full border-b dark:border-gray-800 bg-white dark:bg-gray-900"
    :class="{ 'shadow border-transparent': scrolled }"
    @click="scrollToTop"
  >
    <div class="container mx-auto flex-1 px-4 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="lg:w-1/5 flex items-center pr-4" @click.stop="noop">
          <NuxtLink
            :to="localePath('/')"
            class="flex-shrink-0 flex-1 font-bold text-xl"
            :aria-label="`${settings.title} Logo`"
          >
            <span v-if="!logo">{{ settings.title }}</span>

            <img
              v-if="logo"
              :src="logo.light"
              class="h-8 max-w-full light-img"
              :alt="settings.title"
            />
            <img
              v-if="logo"
              :src="logo.dark"
              class="h-8 max-w-full dark-img"
              :alt="settings.title"
            />
          </NuxtLink>
        </div>
        <ul class="w-3/5 pl-8 lg:flex hidden text-center" @click.stop="noop">
          <li
            v-for="(category, categoryPath) in categories"
            :key="categoryPath"
            class="hover-trigger"
            :class="[
              'flex-1',
              'max-w-xs',
              'border-r',
              'border-dashed',
              'border-gray-400',
              'dark:border-gray-700',
              'first:border-l',
              'text-gray-700',
              'dark:text-gray-300',
            ]"
          >
            <NuxtLink
              :to="localePath(`/${categoryPath}`)"
              :class="['block', 'hover:text-primary-500', 'leading-10']"
            >
              {{ category.title || category }}
            </NuxtLink>
            <div class="relative hover-target fadeIn">
              <ul
                v-if="category.children"
                :class="[
                  'w-full',
                  'absolute',
                  'rounded',
                  'bg-white',
                  'dark:bg-gray-900',
                  'shadow',
                  'dark:shadow-white',
                  'text-left',
                ]"
              >
                <li
                  v-for="(subCategory, subCategoryPath) in category.children"
                  :key="subCategoryPath"
                  :class="[
                    'transition-colors',
                    'duration-150',
                    'ease-in-out',
                    'hover:bg-gray-200',
                    'dark-hover:bg-gray-800',
                    'hover:text-primary-500',
                  ]"
                >
                  <NuxtLink
                    :to="localePath(`/${categoryPath}/${subCategoryPath}`)"
                    :class="['pl-4', 'block', 'leading-10']"
                  >
                    {{ subCategory.title || subCategory }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div class="w-1/5 lg:flex hidden justify-end" @click.stop="noop">
          <AppLangSwitcher />
          <AppColorSwitcher class="ml-4" />
        </div>
        <div class="lg:hidden flex items-center pl-4 justify-end">
          <button
            class="p-2 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none -mr-2"
            aria-label="Menu"
            @click.stop="menu = !menu"
          >
            <IconX v-if="menu" class="w-5 h-5" />
            <IconMenu v-else class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      scrolled: 0,
    }
  },
  computed: {
    ...mapGetters(['settings', 'githubUrls']),
    menu: {
      get() {
        return this.$store.state.menu.open
      },
      set(val) {
        this.$store.commit('menu/toggle', val)
      },
    },
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
    categories() {
      return this.$store.state.settings.categories
    },
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 0
    },
    scrollToTop() {
      if (window.innerWidth >= 1280) {
        return
      }
      window.scrollTo(0, 0)
    },
    noop() {},
  },
}
</script>

<style scoped>
.hover-trigger .hover-target {
  display: none;
}

.hover-trigger:hover .hover-target {
  display: block;
  animation: fade 150ms ease-in-out;
}
</style>
