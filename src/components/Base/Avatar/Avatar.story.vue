<script lang="ts" setup>
import { reactive } from "vue";
import Avatar from "./Avatar.vue";
import { AvatarProps } from "./types";

const state = reactive<AvatarProps & { toggleImage: boolean }>({
  src: "https://randomuser.me/api/portraits/women/59.jpg",
  name: "Alice Jones",
  size: "medium",
  squared: false,
  toggleImage: true,
});
</script>

<template>
  <Story title="Base Components/Avatar">
    <template #controls>
      <HstSelect
        v-model="state.size"
        :title="'Size'"
        :options="{
          large: 'Large',
          medium: 'Medium',
          small: 'Small',
          tiny: 'Tiny',
        }"
      />
      <HstText v-model="state.src" title="Text" />
      <HstText v-model="state.name" title="Name" />
      <HstCheckbox v-model="state.squared" title="Squared" />
      <HstCheckbox v-model="state.toggleImage" title="Toggle Image" />
    </template>

    <Variant title="Single Avatar" autoPropsDisabled>
      <Avatar
        :src="state.toggleImage ? state.src : ''"
        :name="state.name"
        :size="state.size"
        :squared="state.squared"
      />
    </Variant>
  </Story>
</template>
