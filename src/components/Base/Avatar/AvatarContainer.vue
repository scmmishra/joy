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
    class="inline-flex items-center justify-center object-cover overflow-hidden font-medium text-blue-500 bg-blue-100"
    :class="{
      'w-16 h-16 text-lg': size === 'large',
      'w-12 h-12 text-sm': size === 'medium',
      'w-8 h-8 text-xs': size === 'small',
      'w-6 h-6 text-[0.625rem]': size === 'tiny',
      'rounded-full': !squared,
      'rounded-xl': squared && size === 'large',
      'rounded-lg': squared && ['medium', 'small'].includes(size),
      'rounded-md': squared && size === 'tiny',
    }"
  >
    <slot></slot>
  </span>
</template>
