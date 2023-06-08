export type AvatarSizes = "large" | "medium" | "small" | "tiny";

export interface AvatarProps {
  src: string;
  name: string;
  size?: AvatarSizes;
  squared?: boolean;
}
