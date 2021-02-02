<template>
  <div class="w-1/4 px-8 lg:block relative hidden">
    <AppSearchWrapper class="pt-8" />
    <div class="pt-8 top-16 sticky">
      <p class="pb-2 text-gray-500 uppercase tracking-wider font-bold text-sm">
        {{ $t('toc.titleOnThisPage') }}
      </p>
      <AppToc class="h-96 overflow-auto" :toc="toc" />
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
