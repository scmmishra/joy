<script lang="ts" setup>
import Icon from "../Icon/Icon.vue";
import { computed } from "vue";
import type { ButtonColors, ButtonProps, ButtonVariants } from "./types";

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

const classes: Record<ButtonColors, Record<ButtonVariants, string>> = {
  primary: {
    solid: "bg-blue-500 hover:bg-blue-600 active:bg-blue-600 text-white",
    outline:
      "hover:bg-blue-50 active:bg-blue-50 text-blue-500 border border-blue-300",
    faded: "bg-blue-50 text-blue-500 hover:bg-blue-100 active:bg-blue-100",
    clear: "bg-transparent hover:bg-blue-50 active:bg-blue-50 text-blue-500",
  },
  secondary: {
    solid: "bg-gray-50 hover:bg-gray-100 active:bg-gray-100 text-gray-600",
    outline:
      "hover:bg-gray-100 active:bg-gray-50 text-gray-800 border border-gray-200",
    faded: "bg-gray-50 text-gray-500 hover:bg-gray-100 active:bg-gray-100",
    clear: "bg-transparent hover:bg-gray-50 active:bg-gray-50 text-gray-500",
  },
  warning: {
    solid: "bg-orange-500 hover:bg-orange-600 active:bg-orange-600 text-white",
    outline:
      "hover:bg-orange-50 active:bg-orange-50 text-orange-600 border border-orange-300",
    faded:
      "bg-orange-50 text-orange-500 hover:bg-orange-100 active:bg-orange-100",
    clear:
      "bg-transparent hover:bg-orange-50 active:bg-orange-50 text-orange-500",
  },
  danger: {
    solid: "bg-red-500 hover:bg-red-600 active:bg-red-600 text-white",
    outline:
      "hover:bg-red-50 active:bg-red-50 text-red-600 border border-red-300",
    faded: "bg-red-50 text-red-500 hover:bg-red-100 active:bg-red-100",
    clear: "bg-transparent hover:bg-red-50 active:bg-red-50 text-red-500",
  },
  success: {
    solid: "bg-green-500 hover:bg-green-600 active:bg-green-600 text-white",
    outline:
      "hover:bg-green-50 active:bg-green-50 text-green-600 border border-green-300",
    faded: "bg-green-50 text-green-500 hover:bg-green-100 active:bg-green-100",
    clear: "bg-transparent hover:bg-green-50 active:bg-green-50 text-green-500",
  },
};

const classesToApply = computed(() => {
  if (props.disabled) {
    return "bg-gray-100 text-gray-300 cursor-not-allowed";
  }
  return classes[props.color][props.variant];
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
