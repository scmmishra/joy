<script lang="ts" setup>
import { computed } from "vue";

import Avatar from "./Avatar.vue";
import AvatarContainer from "./AvatarContainer.vue";

import { AvatarGroupProps } from "./types";

const props = withDefaults(defineProps<AvatarGroupProps>(), {
  size: "medium",
  squared: false,
  max: 3,
});

const trimmedAvatars = computed(() => {
  if (props.avatars.length <= props.max) {
    return props.avatars;
  }

  return props.avatars.slice(0, props.max);
});

const extraAvatarCount = computed(() => {
  if (props.avatars.length <= props.max) {
    return 0;
  }
  return props.avatars.length - trimmedAvatars.value.length;
});
</script>
<template>
  <div class="inline-flex">
    <Avatar
      class="relative -mr-1.5 last:mr-0 ring-2 ring-white group-hover:mr-0"
      v-for="avatar in trimmedAvatars"
      v-bind="avatar"
      :size="size"
      :squared="squared"
      :class="{
        'ring-2': ['small', 'tiny'].includes(size),
        'ring-4': ['medium', 'large'].includes(size),
      }"
    />
    <AvatarContainer
      v-if="extraAvatarCount"
      :size="size"
      :squared="squared"
      class="relative grid text-xs font-medium text-blue-500 bg-blue-100 place-content-center -mr-1.5 last:mr-0 ring-white"
      :class="{
        'ring-2': ['small', 'tiny'].includes(size),
        'ring-4': ['medium', 'large'].includes(size),
      }"
    >
      +{{ extraAvatarCount }}
    </AvatarContainer>
  </div>
</template>
