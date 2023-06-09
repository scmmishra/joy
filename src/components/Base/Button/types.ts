export type ButtonSizes = "large" | "medium" | "small";
export type ButtonColors =
  | "primary"
  | "secondary"
  | "warning"
  | "danger"
  | "success";

export interface ButtonProps {
  size?: ButtonSizes;
  color?: ButtonColors;
  disabled?: boolean;
  text?: string;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: string;
  trailingIcon?: boolean;
  elevated?: boolean;
}
