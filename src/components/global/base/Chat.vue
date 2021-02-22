<template>
  <div class="flex my-8">
    <div class="flex flex-col items-center w-16 lg:w-24">
      <nuxt-img
        class="rounded-full border-2 border-gray-500"
        :src="`/chat/${face}.png`"
        :alt="name"
        width="96"
      />
      <p class="pt-2 text-xs">{{ name }}</p>
    </div>
    <div class="ml-8 arrowbox" :class="colorClass">
      <div class="leading-10 arrowbox-inner"><slot /></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    face: {
      type: String, // 'toragra' | 'man' | 'woman'
      required: true,
    },
    name: {
      type: String,
      required: false,
      default: () => '',
    },
  },
  computed: {
    colorClass() {
      switch (this.face) {
        case 'toragra':
          return 'primary'
        case 'man':
          return 'blue'
      }
      return ''
    },
  },
})
</script>

<style lang="scss" scoped>
/* prose img, prose p に margin スタイルがあたってしまうため、リセット */
img {
  margin: 0;
}
p {
  margin: 0;
}

.arrowbox {
  position: relative;
  max-width: 60%;

  &::after,
  &::before {
    position: absolute;
    top: 0;
    width: 0;
    height: 0;
    pointer-events: none;
    content: '';
    border: solid transparent;
  }

  &::before {
    left: -11px;
    margin-top: 10px;
    border-width: 10px 13px 10px 0;
  }

  &::after {
    left: -8px;
    margin-top: 13px;
    border-width: 7px 10px 7px 0;
    border-right-color: var(--color-white);
  }

  &-inner {
    padding: 0.5rem 1rem;
  }
}

.primary {
  &.arrowbox {
    &::before {
      border-right-color: var(--color-primary-400);
    }
    .arrowbox-inner {
      border: 2px solid var(--color-primary-400);
    }
  }
}

.blue {
  &.arrowbox {
    &::before {
      border-right-color: var(--color-blue-400);
    }
    .arrowbox-inner {
      border: 2px solid var(--color-blue-400);
    }
  }
}

.dark-mode {
  .primary {
    &.arrowbox {
      &::before {
        border-right-color: var(--color-primary-600);
      }
      .arrowbox-inner {
        border: 2px solid var(--color-primary-600);
      }
    }
  }

  .blue {
    &.arrowbox {
      &::before {
        border-right-color: var(--color-blue-600);
      }
      .arrowbox-inner {
        border: 2px solid var(--color-blue-600);
      }
    }
  }

  .arrowbox::after {
    border-right-color: var(--color-gray-900);
  }
}
</style>
