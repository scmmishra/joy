<script lang="ts" setup>
import { computed, reactive } from "vue";
import AvatarGroup from "./AvatarGroup.vue";
import { AvatarGroupProps } from "./types";

const state = reactive<AvatarGroupProps>({
  avatars: [
    {
      src: "https://randomuser.me/api/portraits/women/51.jpg",
      name: "New Avatar 1",
    },
    {
      src: "https://randomuser.me/api/portraits/women/52.jpg",
      name: "New Avatar 2",
    },
    {
      src: "https://randomuser.me/api/portraits/women/53.jpg",
      name: "New Avatar 3",
    },
    {
      src: "https://randomuser.me/api/portraits/women/54.jpg",
      name: "New Avatar 4",
    },
  ],
  size: "medium",
  squared: false,
  useFallbackImage: true,
  max: 6,
});

function addAvatar() {
  state.avatars.push({
    src: `https://randomuser.me/api/portraits/women/${
      50 + state.avatars.length + 1
    }.jpg`,
    name: `New Avatar ${state.avatars.length + 1}`,
  });
}

const avatarWithBrokenImages = computed(() => {
  return state.avatars.map((avatar) => {
    return {
      src: "broken",
      name: avatar.name,
    };
  });
});

function removeAvatar() {
  state.avatars.pop();
}
</script>

<template>
  <Story
    title="Base Components/Avatar Group"
    :layout="{ type: 'grid', width: 500 }"
  >
    <Variant title="Default" autoPropsDisabled>
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
      <AvatarGroup
        :avatars="state.avatars"
        :size="state.size"
        :max="state.max"
        :squared="state.squared"
      />
    </Variant>

    <Variant title="With Fallback" autoPropsDisabled>
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
      <AvatarGroup
        :avatars="avatarWithBrokenImages"
        :size="state.size"
        :max="state.max"
        :squared="state.squared"
        :useFallbackImage="true"
      />
    </Variant>

    <Variant title="With Initials" autoPropsDisabled>
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
      <AvatarGroup
        :avatars="avatarWithBrokenImages"
        :size="state.size"
        :max="state.max"
        :squared="state.squared"
        :useFallbackImage="false"
      />
    </Variant>
  </Story>
</template>
