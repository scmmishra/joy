<script lang="ts" setup>
import { reactive } from "vue";
import Avatar from "./Avatar.vue";
import AvatarGroup from "./AvatarGroup.vue";
import { AvatarGroupProps, AvatarProps } from "./types";

const state = reactive<AvatarProps & { toggleImage: boolean }>({
  src: "https://randomuser.me/api/portraits/women/59.jpg",
  name: "Alice Jones",
  size: "medium",
  squared: false,
  useFallbackImage: true,
  toggleImage: true,
});

const groupState = reactive<AvatarGroupProps>({
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
  groupState.avatars.push({
    src: `broken-image-${groupState.avatars.length + 1}`,
    name: `New Avatar ${groupState.avatars.length + 1}`,
  });
}

function removeAvatar() {
  groupState.avatars.pop();
}
</script>

<template>
  <Story title="Base Components/Avatar">
    <Variant title="Single Avatar" autoPropsDisabled>
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
        <HstCheckbox v-model="state.useFallbackImage" title="Fallback Image" />
        <HstCheckbox v-model="state.toggleImage" title="Toggle Image" />
      </template>

      <Avatar
        :src="state.toggleImage ? state.src : ''"
        :name="state.name"
        :size="state.size"
        :squared="state.squared"
        :useFallbackImage="state.useFallbackImage"
      />
    </Variant>

    <Variant title="Avatar Group" autoPropsDisabled>
      <template #controls>
        <HstSelect
          v-model="groupState.size"
          :title="'Size'"
          :options="{
            large: 'Large',
            medium: 'Medium',
            small: 'Small',
            tiny: 'Tiny',
          }"
        />
        <HstCheckbox v-model="groupState.squared" title="Squared" />
        <HstCheckbox v-model="state.useFallbackImage" title="Fallback Image" />
        <HstNumber v-model="groupState.max" title="Max avatars" />
        <div class="htw-flex htw-flex-col htw-gap-1 htw-p-2">
          <HstButton class="w-full htw-p-2" @click="addAvatar">
            Add Avatar
          </HstButton>
          <HstButton class="w-full htw-p-2" @click="removeAvatar">
            Remove Avatar
          </HstButton>
        </div>
      </template>
      <AvatarGroup v-bind="groupState" />
    </Variant>
  </Story>
</template>
