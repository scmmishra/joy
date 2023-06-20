import { UIColors, UIVariants } from "../../colors";
import { IconOptions } from "../Icon/types";

export type ButtonSizes = "large" | "medium" | "small";
export type ButtonColors = UIColors;

export type ButtonVariants = UIVariants;

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
