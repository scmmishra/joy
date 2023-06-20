import { UIColors, UIVariants } from "../../colors";

export type BadgeSizes = "medium" | "small" | "x-small";
export type BadgeColors = UIColors;
export type BadgeVariants = Exclude<UIVariants, "clear">;
export type BadgeContainerPositions =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export interface BadgeProps {
  size?: BadgeSizes;
  color?: BadgeColors;
  variant?: BadgeVariants;
  text?: string;
  rounded?: boolean;
  dot?: boolean;
}

export interface BadgeContainerProps {
  position: BadgeContainerPositions;
}
