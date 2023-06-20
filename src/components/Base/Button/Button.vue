<script lang="ts" setup>
import Icon from "../Icon/Icon.vue";
import { computed } from "vue";
import type { ButtonProps } from "./types";
import useColors from "../../../composables/useColors";

const props = withDefaults(defineProps<ButtonProps>(), {
  size: "medium",
  variant: "solid",
  color: "primary",
  disabled: false,
  text: "Button",
  fullWidth: false,
  loading: false,
  trailingIcon: false,
  icon: undefined,
  elevated: false,
});

const isLoading = computed(() => props.loading && !props.disabled);

const classesToApply = computed(() => {
  if (props.disabled) {
    return "bg-gray-100 text-gray-300 cursor-not-allowed";
  }

  return useColors({
    color: props.color,
    variant: props.variant,
  });
});
</script>

<template>
  <button
    class="inline-flex items-center justify-center gap-1.5 transition-colors duration-200 rounded-lg with-icon focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    :class="{
      'px-4 py-3 text-sm leading-6 h-12': size === 'large',
      'px-4 py-2 text-sm leading-6 h-10': size === 'medium',
      'px-3 py-1 text-sm leading-6 h-8': size === 'small',
      'w-full flex justify-center': fullWidth,
      'flex-row-reverse': trailingIcon && icon,
      'shadow-clear-button': elevated,
      relative: isLoading,
      [classesToApply]: true,
    }"
    :aria-label="text"
  >
    <Icon
      v-if="isLoading"
      name="Loader2"
      class="absolute w-4 h-4 animate-spin"
    />
    <Icon
      v-if="icon"
      :name="icon"
      class="w-4 h-4"
      :class="{
        invisible: isLoading,
      }"
    />
    <span
      :class="{
        invisible: isLoading,
      }"
    >
      <slot>
        {{ text }}
      </slot>
    </span>
  </button>
</template>
