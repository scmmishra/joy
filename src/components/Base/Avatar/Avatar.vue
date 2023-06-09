<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import type { AvatarProps, AvatarSizes } from "./types";
import FallbackAvatar from "./FallbackAvatar.vue";
import AvatarContainer from "./AvatarContainer.vue";

const props = withDefaults(defineProps<AvatarProps>(), {
  size: "medium",
  squared: false,
  useFallbackImage: false,
});

const sizeMap: Record<AvatarSizes, number> = {
  large: 64,
  medium: 48,
  small: 32,
  tiny: 24,
};

const fallbackSize = computed(() => sizeMap[props.size]);
const isImageValid = ref(true);

function invalidateCurrentImage() {
  isImageValid.value = false;
}

const initials = computed(() => {
  const splitNames = props.name.split(" ");

  if (splitNames.length > 1) {
    const firstName = splitNames[0];
    const lastName = splitNames[splitNames.length - 1];

    return firstName[0] + lastName[0];
  }

  const firstName = splitNames[0];
  return firstName[0];
});

watch(
  () => props.src,
  () => {
    isImageValid.value = true;
  }
);
</script>

<template>
  <AvatarContainer
    :aria-label="`Avatar for ${name}`"
    :size="size"
    :squared="squared"
  >
    <img
      v-if="src && isImageValid"
      :src="src"
      :alt="name"
      @error="invalidateCurrentImage"
    />
    <FallbackAvatar
      v-else-if="useFallbackImage"
      :size="fallbackSize"
      :name="name"
    />
    <span v-else>
      {{ initials }}
    </span>
  </AvatarContainer>
</template>
