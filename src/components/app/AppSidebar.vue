<template>
  <div class="px-8 lg:block relative hidden">
    <AppSearchWrapper class="pt-8" />
    <AppProfile
      class="mt-8 px-4 py-4 rounded-lg border-2 border-gray-400 dark:border-gray-600"
    />
    <div class="pt-8 top-16 sticky">
      <AppToc
        class="max-h-60vh overflow-auto px-4 py-4 border-2 border-gray-400 dark:border-gray-600 rounded-lg"
        :toc="toc"
        :title="$t('toc.title')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    toc: {
      type: Array,
      required: true,
    },
  },
})
</script>
