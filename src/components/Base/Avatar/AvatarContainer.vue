<script lang="ts" setup>
import type { AvatarSizes } from "./types";

withDefaults(
  defineProps<{
    size: AvatarSizes;
    squared: boolean;
  }>(),
  {
    size: "medium",
    squared: false,
  }
);
</script>

<template>
  <span
    role="img"
    class="inline-flex object-cover overflow-hidden bg-gray-100"
    :class="{
      'w-16 h-16': size === 'large',
      'w-12 h-12': size === 'medium',
      'w-8 h-8': size === 'small',
      'w-6 h-6': size === 'tiny',
      'rounded-full': !squared,
      'rounded-xl': squared && size === 'large',
      'rounded-lg': squared && ['medium', 'small'].includes(size),
      'rounded-md': squared && size === 'tiny',
    }"
  >
    <slot></slot>
  </span>
</template>
