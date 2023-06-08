<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import type { AvatarProps, AvatarSizes } from "./types";
import FallbackAvatar from "./FallbackAvatar.vue";

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
  <div
    role="img"
    :aria-label="`Avatar for ${name}`"
    class="object-cover overflow-hidden bg-gray-100"
    :class="{
      'w-16 h-16': size === 'large',
      'w-12 h-12': size === 'medium',
      'w-8 h-8': size === 'small',
      'w-6 h-6': size === 'tiny',
      'rounded-full': !squared,
      'rounded-xl': squared && size === 'large',
      'rounded-lg': squared && ['medium', 'small'].includes(size),
      'rounded-md': squared && size === 'tiny',
    }"
  >
    <img
      v-if="src && isImageValid"
      :src="src"
      :alt="name"
      @error="invalidateCurrentImage"
    />
    <FallbackAvatar v-else :size="fallbackSize" :name="name" />
  </div>
</template>
