export type AvatarSizes = "large" | "medium" | "small" | "tiny";

export interface BaseAvatarProps {
  src: string;
  name: string;
}

export interface AvatarProps extends BaseAvatarProps {
  size?: AvatarSizes;
  squared?: boolean;
  useFallbackImage?: boolean;
}

export interface AvatarGroupProps {
  avatars: BaseAvatarProps[];
  size?: AvatarSizes;
  squared?: boolean;
  max?: number;
  useFallbackImage?: boolean;
}
