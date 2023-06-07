<template>
  <component :is="icon" />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import * as icons from "lucide-vue-next";

const props = defineProps<{
  name: keyof typeof icons;
}>();

const icon = computed(() => icons[props.name]);
</script>
