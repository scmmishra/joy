import { IconOptions } from "../Icon/types";

export type ButtonSizes = "large" | "medium" | "small";
export type ButtonColors =
  | "primary"
  | "secondary"
  | "warning"
  | "danger"
  | "success";

export type ButtonVariants = "solid" | "faded" | "outline" | "clear";

export interface ButtonProps {
  size?: ButtonSizes;
  color?: ButtonColors;
  variant?: ButtonVariants;
  disabled?: boolean;
  text?: string;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: IconOptions;
  trailingIcon?: boolean;
  elevated?: boolean;
}
