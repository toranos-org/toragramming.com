<template>
  <div>
    <AppSearchAlgolia
      v-if="settings.algolia"
      :options="settings.algolia"
      :settings="settings"
    />
    <AppSearch v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['settings']),
  },
}
</script>
