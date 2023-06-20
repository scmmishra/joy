<script lang="ts" setup>
import { reactive } from "vue";
import Badge from "./Badge.vue";
import { BadgeColors, BadgeProps, BadgeVariants } from "./types";

const state = reactive<BadgeProps>({
  text: "Badge",
  variant: "solid",
  size: "medium",
  rounded: false,
  dot: false,
});

const colorOptions: BadgeColors[] = [
  "primary",
  "secondary",
  "warning",
  "danger",
  "success",
];

const variantOptions: Record<BadgeVariants, string> = {
  solid: "Solid",
  outline: "Outline",
  faded: "Faded",
};
</script>

<template>
  <Story title="Base Components/Badge">
    <template #controls>
      <HstSelect
        v-model="state.size"
        title="Size"
        :options="{
          medium: 'Medium',
          small: 'Small',
          'x-small': 'X-Small',
        }"
      />
      <HstSelect
        v-model="state.variant"
        title="Variant"
        :options="variantOptions"
      />
      <HstText v-model="state.text" title="Text" />
      <HstCheckbox v-model="state.rounded" title="Rounded" />
      <HstCheckbox v-model="state.dot" title="Has Dot" />
    </template>

    <Variant v-for="color in colorOptions" :title="color" autoPropsDisabled>
      <div class="flex items-center justify-center p-5">
        <Badge v-bind="state" :color="color">
          {{ state.text }}
        </Badge>
      </div>
    </Variant>
  </Story>
</template>
