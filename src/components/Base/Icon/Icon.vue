<template>
  <component :is="icon" />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import * as icons from "lucide-vue-next";
import { IconOptions } from "./types";

const props = defineProps<{
  name: IconOptions;
}>();

const icon = computed(() => icons[props.name]);
</script>
