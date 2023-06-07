<script lang="ts" setup>
import Icon from "../Icon/Icon.vue";
import { computed } from "vue";
import type { ButtonProps } from "./types";

const props = withDefaults(defineProps<ButtonProps>(), {
  size: "medium",
  style: "primary",
  disabled: false,
  text: "Button",
  fullWidth: false,
  loading: false,
  trailingIcon: false,
  icon: "",
});

const isLoading = computed(() => props.loading && !props.disabled);
</script>

<template>
  <button
    class="inline-flex items-center justify-center gap-1.5 transition-colors duration-200 rounded-lg with-icon focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    :class="{
      'px-4 py-3 text-sm leading-6 h-12': size === 'large',
      'px-4 py-2 text-sm leading-6 h-10': size === 'medium',
      'px-3 py-1 text-sm leading-6 h-8': size === 'small',
      'bg-blue-500 hover:bg-blue-600 text-white':
        style === 'primary' && !disabled,
      'bg-transparent hover:bg-gray-50 text-gray-800':
        style === 'clear' && !disabled,
      'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-clear-button':
        style === 'secondary' && !disabled,
      'bg-orange-500 hover:bg-orange-600 text-white':
        style === 'warning' && !disabled,
      'bg-red-500 hover:bg-red-600 text-white': style === 'danger' && !disabled,
      'bg-green-500 hover:bg-green-600 text-white':
        style === 'success' && !disabled,
      'bg-gray-100 text-gray-300 cursor-not-allowed': disabled,
      'w-full flex justify-center': fullWidth,
      'flex-row-reverse': trailingIcon && icon,
      relative: isLoading,
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
