<script lang="ts" setup>
import { computed } from "vue";
import type { BadgeProps } from "./types";
import useColors from "../../../composables/useColors";

const props = withDefaults(defineProps<BadgeProps>(), {
  size: "medium",
  variant: "solid",
  color: "primary",
  text: "",
  rounded: false,
});

const classesToApply = computed(() => {
  return useColors({
    color: props.color,
    variant: props.variant,
  });
});
</script>

<template>
  <span
    class="inline-flex items-center justify-center"
    :class="{
      'px-2 py-0.5 text-sm leading-6 gap-1.5': size === 'medium',
      'px-1.5 text-xs leading-6 gap-1.5': size === 'small',
      'px-1 text-[10px] leading-5 gap-1': size === 'x-small',
      'rounded-lg': !rounded && ['medium'].includes(size),
      'rounded-md': !rounded && ['small', 'x-small'].includes(size),
      'rounded-full': rounded,
      [classesToApply]: true,
    }"
    :aria-label="text"
  >
    <Icon
      v-if="dot"
      class="bg-current rounded-full opacity-80"
      :class="{
        'w-1.5 h-1.5': ['medium', 'small'].includes(size),
        'w-1 h-1': ['x-small'].includes(size),
      }"
    />
    <slot>
      {{ text }}
    </slot>
  </span>
</template>
