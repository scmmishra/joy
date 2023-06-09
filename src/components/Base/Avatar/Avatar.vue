<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import type { AvatarProps, AvatarSizes } from "./types";
import FallbackAvatar from "./FallbackAvatar.vue";
import AvatarContainer from "./AvatarContainer.vue";

const props = withDefaults(defineProps<AvatarProps>(), {
  size: "medium",
  squared: false,
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
    <FallbackAvatar v-else :size="fallbackSize" :name="name" />
  </AvatarContainer>
</template>
