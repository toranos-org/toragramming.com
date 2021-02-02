export default async function ({ store, app }) {
  if (process.server) {
    await store.dispatch('fetchSettings')
    await store.dispatch('fetchCategories')
  }
  // Spa Fallback
  if (process.client && !store.state.settings.filled) {
    await store.dispatch('fetchSettings')
  }
  if (process.client && !store.state.categories[app.i18n.locale]) {
    await store.dispatch('fetchCategories')
  }
  // Hot reload on development
  if (process.client && process.dev) {
    window.onNuxtReady(() => {
      window.$nuxt.$on('content:update', async () => {
        await store.dispatch('fetchSettings')
        await store.dispatch('fetchCategories')
      })
    })
  }
}
