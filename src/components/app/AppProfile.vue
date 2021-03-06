<template>
  <div>
    <div class="">
      <div class="flex">
        <img
          class="rounded-full"
          src="/icon-for-clip.png"
          width="64"
          height="64"
          alt="Toragramming Icon"
        />
        <div class="ml-4">
          <p class="text-xl font-bold">TigRig</p>
          <p class="mt-2 text-gray-500 dark:text-gray-600">
            <a
              :href="`https://github.com/${settings.github}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconGithub
                width="20"
                height="20"
                fill="currentColor"
                class="inline"
              />
            </a>
            <a
              :href="`https://twitter.com/${settings.twitter}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconTwitter
                width="20"
                height="20"
                fill="currentColor"
                class="inline ml-2"
              />
            </a>
          </p>
        </div>
      </div>
      <p class="mt-4 break-words">
        デスクトップアプリやWebアプリの開発と、ノベルゲーム制作をしております。
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters(['settings']),
  },
})
</script>
