<template>
  <button class="">
    <slot>{{ text }}</slot>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  size: "large" | "medium" | "small" | "x-small";
  style: "primary" | "secondary" | "clear" | "warning" | "danger" | "success";
  disabled: boolean;
  text: string;
}>();
</script>
