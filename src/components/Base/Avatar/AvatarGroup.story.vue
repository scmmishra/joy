<script lang="ts" setup>
import { reactive } from "vue";
import AvatarGroup from "./AvatarGroup.vue";
import { AvatarGroupProps } from "./types";

const state = reactive<AvatarGroupProps>({
  avatars: [
    {
      src: "broken-image",
      name: "Alice Jones",
    },
    {
      src: "broken-image-2",
      name: "Patrick",
    },
    {
      src: "broken-image-3",
      name: "Olivia",
    },
    {
      src: "broken-image-4",
      name: "Anna",
    },
  ],
  size: "medium",
  squared: false,
  useFallbackImage: true,
  max: 6,
});

function addAvatar() {
  state.avatars.push({
    src: `broken-image-${state.avatars.length + 1}`,
    name: `New Avatar ${state.avatars.length + 1}`,
  });
}

function removeAvatar() {
  state.avatars.pop();
}
</script>

<template>
  <Story title="Base Components/Avatar Group">
    <Variant title="Avatar Group" autoPropsDisabled>
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
        <HstCheckbox v-model="state.squared" title="Squared" />
        <HstCheckbox v-model="state.useFallbackImage" title="Fallback Image" />
        <HstNumber v-model="state.max" title="Max avatars" />
        <div class="htw-flex htw-flex-col htw-gap-1 htw-p-2">
          <HstButton class="w-full htw-p-2" @click="addAvatar">
            Add Avatar
          </HstButton>
          <HstButton class="w-full htw-p-2" @click="removeAvatar">
            Remove Avatar
          </HstButton>
        </div>
      </template>
      <AvatarGroup v-bind="state" />
    </Variant>
  </Story>
</template>
