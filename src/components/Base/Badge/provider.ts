import { inject, InjectionKey, Ref, provide } from "vue";

export type BadgeContainerPayload = {
  registerBadge(badge: Ref<HTMLElement | null>): void;
};

const defaultBadgeContainerPayload: BadgeContainerPayload = {
  registerBadge(_: Ref<HTMLElement | null>) {
    return;
  },
};

export const badgeControl = Symbol(
  "_JoyBadgeControl"
) as InjectionKey<BadgeContainerPayload>;

export function useBadgeContainer() {
  const context = inject(badgeControl, null);

  if (context === null) {
    return defaultBadgeContainerPayload;
  }

  return context;
}

export function useBadgeContainerProvider(value: BadgeContainerPayload) {
  return provide(badgeControl, value);
}
