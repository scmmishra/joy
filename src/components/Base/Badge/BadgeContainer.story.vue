<script lang="ts" setup>
import { reactive } from "vue";

import Badge from "./Badge.vue";
import BadgeContainer from "./BadgeContainer.vue";
import Avatar from "../Avatar/Avatar.vue";

import {
  BadgeColors,
  BadgeContainerPositions,
  BadgeProps,
  BadgeVariants,
} from "./types";
import { BadgeContainerProps } from "./types";

const state = reactive<BadgeProps>({
  color: "danger",
  text: "inactive",
  variant: "solid",
  size: "x-small",
  rounded: false,
  dot: false,
});

const containerState = reactive<BadgeContainerProps>({
  position: "bottom-right",
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

const positionOptions: BadgeContainerPositions[] = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
];
</script>

<template>
  <Story title="Base Components/Badge Container">
    <template #controls>
      <HstSelect
        v-model="containerState.position"
        title="Position"
        :options="positionOptions"
      />

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
      <HstSelect v-model="state.color" title="Color" :options="colorOptions" />
      <HstText v-model="state.text" title="Text" />
      <HstCheckbox v-model="state.rounded" title="Rounded" />
      <HstCheckbox v-model="state.dot" title="Has Dot" />
    </template>
    <section class="p-12" autoPropsDisabled>
      <BadgeContainer :position="containerState.position">
        <Badge v-bind="state">
          {{ state.text }}
        </Badge>
        <Avatar
          src=""
          :name="'Alice Jones'"
          :size="'medium'"
          :squared="false"
          :useFallbackImage="true"
        />
      </BadgeContainer>
    </section>
  </Story>
</template>
