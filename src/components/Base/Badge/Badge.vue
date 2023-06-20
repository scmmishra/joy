<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import type { BadgeProps } from "./types";
import useColors from "../../../composables/useColors";
import { useBadgeContainer } from "./provider";

const props = withDefaults(defineProps<BadgeProps>(), {
  size: "medium",
  variant: "solid",
  color: "primary",
  text: "",
  rounded: false,
});

let internalBadgeRef = ref<HTMLElement | null>(null);

const { registerBadge } = useBadgeContainer();

onMounted(() => {
  registerBadge(internalBadgeRef);
});

watch(
  () => props.size,
  () => registerBadge(internalBadgeRef),
  { immediate: true }
);

watch(
  () => props.text,
  () => registerBadge(internalBadgeRef),
  { immediate: true }
);

watch(
  () => props.rounded,
  () => registerBadge(internalBadgeRef),
  { immediate: true }
);

const classesToApply = computed(() => {
  return useColors({
    color: props.color,
    variant: props.variant,
  });
});
</script>

<template>
  <span
    ref="internalBadgeRef"
    class="inline-flex items-center justify-center"
    :class="{
      'px-2 py-0.5 text-sm leading-6 gap-1.5 h-7 min-w-[1.75rem]':
        size === 'medium',
      'px-1.5 text-xs leading-6 gap-1.5 h-6 min-w-[1.5rem]': size === 'small',
      'px-1 text-[10px] leading-4 gap-1 h-4 min-w-[1rem]': size === 'x-small',
      'rounded-lg': !rounded && ['medium'].includes(size),
      'rounded-md': !rounded && ['small', 'x-small'].includes(size),
      'rounded-full': rounded,
      [classesToApply]: true,
    }"
    :aria-label="text"
  >
    <span
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
