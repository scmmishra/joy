<script lang="ts" setup>
const props = defineProps<{
  size: number;
  name: string;
}>();

const VIEWPORT_SIZE = 36;

import { computed, ref } from "vue";
import {
  hashCode,
  getUnit,
  getBoolean,
  getRandomColor,
  getContrast,
} from "../../../utils/avatar";

// Based on https://github.com/boringdesigners/boring-avatars/
function generateData(name: string) {
  const colors = ["#d9e6ff", "#8eb9ff", "#3069fe", "#1535e0", "#192c8f"];
  const numFromName = hashCode(name);
  const range = colors && colors.length;
  const wrapperColor = getRandomColor(numFromName, colors, range);
  const preTranslateX = getUnit(numFromName, 10, 1);
  const wrapperTranslateX =
    preTranslateX < 5 ? preTranslateX + VIEWPORT_SIZE / 9 : preTranslateX;
  const preTranslateY = getUnit(numFromName, 10, 2);
  const wrapperTranslateY =
    preTranslateY < 5 ? preTranslateY + VIEWPORT_SIZE / 9 : preTranslateY;

  const data = {
    wrapperColor: wrapperColor,
    faceColor: getContrast(wrapperColor),
    backgroundColor: getRandomColor(numFromName + 13, colors, range),
    wrapperTranslateX: wrapperTranslateX,
    wrapperTranslateY: wrapperTranslateY,
    wrapperRotate: getUnit(numFromName, 360),
    wrapperScale: 1 + getUnit(numFromName, VIEWPORT_SIZE / 12) / 10,
    isMouthOpen: getBoolean(numFromName, 2),
    isCircle: getBoolean(numFromName, 1),
    eyeSpread: getUnit(numFromName, 5),
    mouthSpread: getUnit(numFromName, 3),
    faceRotate: getUnit(numFromName, 10, 3),
    faceTranslateX:
      wrapperTranslateX > VIEWPORT_SIZE / 6
        ? wrapperTranslateX / 2
        : getUnit(numFromName, 8, 1),
    faceTranslateY:
      wrapperTranslateY > VIEWPORT_SIZE / 6
        ? wrapperTranslateY / 2
        : getUnit(numFromName, 7, 2),
  };

  return data;
}

const maskID = ref(Math.random().toString(36).substring(2, 15));

const data = computed(() => {
  return generateData(props.name);
});
</script>

<template>
  <svg
    :viewBox="`0 0 ${VIEWPORT_SIZE} ${VIEWPORT_SIZE}`"
    fill="none"
    role="img"
    aria-label="Fallback image for avatar"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
  >
    <title>{{ name }}</title>
    <mask
      :id="maskID"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      :width="VIEWPORT_SIZE"
      :height="VIEWPORT_SIZE"
    >
      <rect :width="VIEWPORT_SIZE" :height="VIEWPORT_SIZE" fill="#FFFFFF" />
    </mask>
    <g :mask="'url(#' + maskID + ')'">
      <rect
        :width="VIEWPORT_SIZE"
        :height="VIEWPORT_SIZE"
        :fill="data.backgroundColor"
      />
      <rect
        x="0"
        y="0"
        :width="VIEWPORT_SIZE"
        :height="VIEWPORT_SIZE"
        :transform="`translate(${data.wrapperTranslateX} ${
          data.wrapperTranslateY
        }) rotate(${data.wrapperRotate} ${VIEWPORT_SIZE / 2} ${
          VIEWPORT_SIZE / 2
        }) scale(${data.wrapperScale})`"
        :fill="data.wrapperColor"
        :rx="data.isCircle ? VIEWPORT_SIZE : VIEWPORT_SIZE / 6"
      />
      <g
        :transform="`translate(${data.faceTranslateX} ${
          data.faceTranslateY
        }) rotate(${data.faceRotate} ${VIEWPORT_SIZE / 2} ${
          VIEWPORT_SIZE / 2
        })`"
      >
        <template v-if="data.isMouthOpen">
          <path
            :d="'M15 ' + (19 + data.mouthSpread) + 'c2 1 4 1 6 0'"
            :stroke="data.faceColor"
            fill="none"
            strokeLinecap="round"
          />
        </template>
        <template v-else>
          <path
            :d="'M13,' + (19 + data.mouthSpread) + ' a1,0.75 0 0,0 10,0'"
            :fill="data.faceColor"
          />
        </template>
        <rect
          :x="14 - data.eyeSpread"
          y="14"
          width="1.5"
          height="2"
          rx="1"
          stroke="none"
          :fill="data.faceColor"
        />
        <rect
          :x="20 + data.eyeSpread"
          y="14"
          width="1.5"
          height="2"
          rx="1"
          stroke="none"
          :fill="data.faceColor"
        />
      </g>
    </g>
  </svg>
</template>
