// Taken from nuxtlabs UI: https://github.com/nuxtlabs/ui/blob/dev/src/runtime/composables/useShortcuts.ts
// Thanks a lot for the inspiration!

import { createSharedComposable, useActiveElement } from "@vueuse/core";
import { ref, computed, onMounted } from "vue";

export const _useShortcuts = () => {
  const macOS = computed(
    () =>
      navigator &&
      navigator.userAgent &&
      navigator.userAgent.match(/Macintosh;/)
  );

  const metaSymbol = ref(" ");

  const activeElement = useActiveElement();
  const usingInput = computed(() => {
    const usingInput = !!(
      activeElement.value?.tagName === "INPUT" ||
      activeElement.value?.tagName === "TEXTAREA" ||
      activeElement.value?.tagName === "NINJA-KEYS" ||
      activeElement.value?.contentEditable === "true"
    );

    if (usingInput) {
      return ((activeElement.value as any)?.name as string) || true;
    }

    return false;
  });

  onMounted(() => {
    metaSymbol.value = macOS.value ? "⌘" : "Ctrl";
  });

  return {
    macOS,
    metaSymbol,
    activeElement,
    usingInput,
  };
};

export const useShortcuts = createSharedComposable(_useShortcuts);
