<script setup lang="ts">
import { ref, watch, Ref, nextTick } from "vue";
import { useBadgeContainerProvider } from "./provider";
import { BadgeContainerProps } from "./types";

const badgeEl = ref(null) as Ref<HTMLElement | null>;

function registerBadge(badge: Ref<HTMLElement | null>) {
  badgeEl.value = badge.value;
  nextTick(() => setBadgePosition());
}

const props = withDefaults(defineProps<BadgeContainerProps>(), {
  position: "top-right",
});

watch(props, setBadgePosition);

function setBadgePosition() {
  console.log("WATCH");
  if (!badgeEl.value) return;
  const badge = badgeEl.value;

  badge.style.position = "absolute";

  const { width, height } = badge.getBoundingClientRect();

  const setPosition = ({
    top,
    bottom,
    left,
    right,
  }: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  }) => {
    badge.style.top = top !== undefined ? `${top}px` : "";
    badge.style.bottom = bottom !== undefined ? `${bottom}px` : "";
    badge.style.left = left !== undefined ? `${left}px` : "";
    badge.style.right = right !== undefined ? `${right}px` : "";
  };

  setPosition({});

  const xPos = height / 2 - 4;
  const yPos = width / 2 - 4;

  switch (props.position) {
    case "top-right":
      setPosition({ top: -xPos, right: -yPos });
      break;
    case "top-left":
      setPosition({ top: -xPos, left: -yPos });
      break;
    case "bottom-right":
      setPosition({ bottom: 0, right: -yPos });
      break;
    case "bottom-left":
      setPosition({ bottom: 0, left: -yPos });
      break;
  }
}

useBadgeContainerProvider({ registerBadge });
</script>

<template>
  <div class="relative inline-block align-top">
    <slot></slot>
  </div>
</template>
