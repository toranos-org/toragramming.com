import Vue from 'vue'
import groupBy from 'lodash.groupby'

export const state = () => ({
  categories: {},
  settings: {
    title: 'Nuxt Content Docs',
    url: '',
    defaultDir: 'docs',
    filled: false,
    categories: {},
  },
})

export const getters = {
  settings(state) {
    return state.settings
  },
  githubUrls(state) {
    const { github = '', githubApi = '' } = state.settings

    // GitHub Enterprise
    if (github.startsWith('http') && githubApi.startsWith('http')) {
      return {
        repo: github,
        api: {
          repo: githubApi,
          releases: `${githubApi}/releases`,
        },
      }
    }

    // GitHub
    return {
      repo: `https://github.com/${github}`,
      api: {
        repo: `https://api.github.com/repos/${github}`,
        releases: `https://api.github.com/repos/${github}/releases`,
      },
    }
  },
  /**
   * カテゴリーパスを settings.categories の値に従って、名称変換する
   * @param {string} categoryPath カテゴリーのパス（例： `category-1/child-category-1`）
   * @return {string} カテゴリースラッグを名称変換した文字列（例: `カテゴリー１/子カテゴリー１`）
   */
  getCategoryPathByName(state) {
    return (categoryPath) => {
      const categories = state.settings.categories

      const [parentCategoryKey, childCategoryKey] = categoryPath.split('/')
      const parentCategory = categories[parentCategoryKey]

      let categoryPathByName = parentCategory.title

      if (childCategoryKey)
        categoryPathByName += `/${parentCategory.children[childCategoryKey].title}`

      return categoryPathByName
    }
  },
}

export const mutations = {
  SET_CATEGORIES(state, categories) {
    // Vue Reactivity rules since we add a nested object
    Vue.set(state.categories, this.$i18n.locale, categories)
  },
  SET_SETTINGS(state, settings) {
    state.settings = Object.assign({}, state.settings, settings, {
      filled: true,
    })
    if (!state.settings.url) {
      console.warn(
        'Please provide the `url` property in `content/setting.json`'
      )
    }
  },
}

export const actions = {
  async fetchCategories({ commit, state }) {
    // Avoid re-fetching in production
    if (process.dev === false && state.categories[this.$i18n.locale]) {
      return
    }
    const docs = await this.$content(this.$i18n.locale, { deep: true })
      .only(['title', 'menuTitle', 'category', 'slug', 'version', 'to'])
      .sortBy('createdAt', 'asc')
      .fetch()
    const categories = groupBy(docs, 'category')

    commit('SET_CATEGORIES', categories)
  },
  async fetchSettings({ commit }) {
    try {
      const settings = await this.$content('settings').fetch()
      commit('SET_SETTINGS', settings)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(
        'You can add a `settings.json` file inside the `content/` folder to customize this theme.'
      )
    }
  },
}
