<script lang="ts" setup>
import { reactive } from "vue";
import Avatar from "./Avatar.vue";
import { AvatarProps } from "./types";

const base = {
  src: "https://randomuser.me/api/portraits/women/59.jpg",
  name: "Alice Jones",
  size: "medium",
  squared: false,
  useFallbackImage: true,
  toggleImage: true,
};

const defaultState = reactive<AvatarProps & { toggleImage: boolean }>(
  JSON.parse(JSON.stringify(base))
);

const withFallbackImage = reactive<AvatarProps & { toggleImage: boolean }>(
  JSON.parse(JSON.stringify(base))
);

const withInitials = reactive<AvatarProps & { toggleImage: boolean }>(
  JSON.parse(JSON.stringify(base))
);
</script>

<template>
  <Story title="Base Components/Avatar">
    <Variant title="Base Avatar" autoPropsDisabled>
      <template #controls>
        <HstSelect
          v-model="defaultState.size"
          :title="'Size'"
          :options="{
            large: 'Large',
            medium: 'Medium',
            small: 'Small',
            tiny: 'Tiny',
          }"
        />
        <HstText v-model="defaultState.src" title="Text" />
        <HstText v-model="defaultState.name" title="Name" />
        <HstCheckbox v-model="defaultState.squared" title="Squared" />
        <HstCheckbox
          v-model="defaultState.useFallbackImage"
          title="Fallback Image"
        />
        <HstCheckbox v-model="defaultState.toggleImage" title="Toggle Image" />
      </template>

      <Avatar
        :src="defaultState.toggleImage ? defaultState.src : ''"
        :name="defaultState.name"
        :size="defaultState.size"
        :squared="defaultState.squared"
        :useFallbackImage="defaultState.useFallbackImage"
      />
    </Variant>
    <Variant title="With Fallback Image" autoPropsDisabled>
      <template #controls>
        <HstSelect
          v-model="withFallbackImage.size"
          :title="'Size'"
          :options="{
            large: 'Large',
            medium: 'Medium',
            small: 'Small',
            tiny: 'Tiny',
          }"
        />
        <HstText v-model="withFallbackImage.name" title="Name" />
        <HstCheckbox v-model="withFallbackImage.squared" title="Squared" />
      </template>
      <Avatar
        :src="'broken-image'"
        :name="withFallbackImage.name"
        :size="withFallbackImage.size"
        :squared="withFallbackImage.squared"
        :useFallbackImage="withFallbackImage.useFallbackImage"
      />
    </Variant>
    <Variant title="With Initials" autoPropsDisabled>
      <template #controls>
        <HstSelect
          v-model="withInitials.size"
          :title="'Size'"
          :options="{
            large: 'Large',
            medium: 'Medium',
            small: 'Small',
            tiny: 'Tiny',
          }"
        />
        <HstText v-model="withInitials.name" title="Name" />
        <HstCheckbox v-model="withInitials.squared" title="Squared" />
      </template>
      <Avatar
        :src="'broken-image'"
        :name="withInitials.name"
        :size="withInitials.size"
        :squared="withInitials.squared"
        :useFallbackImage="false"
      />
    </Variant>
  </Story>
</template>
