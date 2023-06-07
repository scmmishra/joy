export type ButtonSizes = "large" | "medium" | "small";
export type ButtonStyles =
  | "primary"
  | "secondary"
  | "clear"
  | "warning"
  | "danger"
  | "success";

export interface ButtonProps {
  size?: ButtonSizes;
  style?: ButtonStyles;
  disabled?: boolean;
  text?: string;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: string;
  trailingIcon?: boolean;
}
