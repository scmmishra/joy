import { UIColors, UIVariants } from "../../colors";

export type BadgeSizes = "medium" | "small" | "x-small";
export type BadgeColors = UIColors;
export type BadgeVariants = Exclude<UIVariants, "clear">;

export interface BadgeProps {
  size?: BadgeSizes;
  color?: BadgeColors;
  variant?: BadgeVariants;
  text?: string;
  rounded?: boolean;
  dot?: boolean;
}
