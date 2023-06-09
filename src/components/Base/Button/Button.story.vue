<script lang="ts" setup>
import { reactive } from "vue";
import Button from "./Button.vue";
import type { ButtonProps, ButtonColors } from "./types";

const state = reactive<ButtonProps>({
  disabled: false,
  text: "Joy Button",
  size: "medium",
  fullWidth: false,
  loading: false,
  icon: "Smile",
  trailingIcon: false,
  elevated: false,
});

const styleOptions: ButtonColors[] = [
  "primary",
  "secondary",
  "warning",
  "danger",
  "success",
];

function updateClicked() {
  alert("Clicked");
}
</script>

<template>
  <Story title="Base Components/Button" :layout="{ type: 'grid', width: 300 }">
    <template #controls>
      <HstSelect
        v-model="state.size"
        :title="'Size'"
        :options="{
          large: 'Large',
          medium: 'Medium',
          small: 'Small',
        }"
      />
      <HstText v-model="state.text" title="Text" />
      <HstCheckbox v-model="state.disabled" title="Disabled" />
      <HstCheckbox v-model="state.fullWidth" title="Full Width" />
      <HstCheckbox v-model="state.loading" title="Loading" />
      <HstCheckbox v-model="state.elevated" title="Elevated" />
      <div>
        <h5 class="px-2 mt-5 text-xs tracking-widest text-gray-300 uppercase">
          Icon Options
        </h5>
        <HstText v-model="state.icon" title="Icon" />
        <HstCheckbox v-model="state.trailingIcon" title="Trailing Icon" />
      </div>
    </template>

    <Variant v-for="style in styleOptions" :title="style" autoPropsDisabled>
      <div class="flex items-center justify-center p-5">
        <Button
          :size="state.size"
          :color="style"
          :disabled="state.disabled"
          :fullWidth="state.fullWidth"
          :loading="state.loading"
          :icon="state.icon"
          :trailingIcon="state.trailingIcon"
          :elevated="state.elevated"
          @click="updateClicked"
        >
          {{ state.text }}
        </Button>
      </div>
    </Variant>
  </Story>
</template>
