<template>
  <aside
    class="w-full fixed inset-0 mt-16 z-40 bg-white dark:bg-gray-900 border-t dark:border-gray-800"
    :class="{ block: menu, hidden: !menu }"
  >
    <div class="overflow-y-auto h-full">
      <ul class="p-4">
        <li v-if="!settings.algolia" class="mb-4">
          <AppSearch />
        </li>
        <li
          v-for="(category, categoryPath) in categories"
          :key="categoryPath"
          class="mb-4 text-gray-700 dark:text-gray-300"
        >
          <NuxtLink
            :to="localePath(`/${categoryPath}`)"
            class="px-2 rounded font-medium py-1 hover:text-primary-500 flex items-center justify-between"
          >
            {{ category.title || category }}
          </NuxtLink>
          <ul v-if="category.children" class="px-4">
            <li
              v-for="(subCategory, subCategoryPath) in category.children"
              :key="subCategoryPath"
              class="first:mt-0 mt-4"
            >
              <NuxtLink
                :to="localePath(`/${categoryPath}/${subCategoryPath}`)"
                class="px-2 rounded font-medium py-1 hover:text-primary-500 flex items-center justify-between"
              >
                {{ subCategory.title || subCategory }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
      <div class="fixed z-10 bottom-4 right-4 mr-2">
        <!-- mr-2 はスクロールバーと重ならないようにするため -->
        <AppLangSwitcher />
        <AppColorSwitcher class="ml-4" />
      </div>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
    categories() {
      return this.$store.state.settings.categories
    },
  },
}
</script>
