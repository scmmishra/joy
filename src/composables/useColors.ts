import { UIColors, UIVariants } from "../components/colors";

const COLOR_OPTIONS: Record<UIColors, Record<UIVariants, string>> = {
  primary: {
    solid: "bg-blue-500 hover:bg-blue-600 active:bg-blue-600 text-white",
    outline:
      "hover:bg-blue-50 active:bg-blue-50 text-blue-500 border border-blue-300",
    faded: "bg-blue-50 text-blue-500 hover:bg-blue-100 active:bg-blue-100",
    clear: "bg-transparent hover:bg-blue-50 active:bg-blue-50 text-blue-500",
  },
  secondary: {
    solid: "bg-gray-50 hover:bg-gray-100 active:bg-gray-100 text-gray-600",
    outline:
      "hover:bg-gray-100 active:bg-gray-50 text-gray-800 border border-gray-200",
    faded: "bg-gray-50 text-gray-500 hover:bg-gray-100 active:bg-gray-100",
    clear: "bg-transparent hover:bg-gray-50 active:bg-gray-50 text-gray-500",
  },
  warning: {
    solid: "bg-orange-500 hover:bg-orange-600 active:bg-orange-600 text-white",
    outline:
      "hover:bg-orange-50 active:bg-orange-50 text-orange-600 border border-orange-300",
    faded:
      "bg-orange-50 text-orange-500 hover:bg-orange-100 active:bg-orange-100",
    clear:
      "bg-transparent hover:bg-orange-50 active:bg-orange-50 text-orange-500",
  },
  danger: {
    solid: "bg-red-500 hover:bg-red-600 active:bg-red-600 text-white",
    outline:
      "hover:bg-red-50 active:bg-red-50 text-red-600 border border-red-300",
    faded: "bg-red-50 text-red-500 hover:bg-red-100 active:bg-red-100",
    clear: "bg-transparent hover:bg-red-50 active:bg-red-50 text-red-500",
  },
  success: {
    solid: "bg-green-500 hover:bg-green-600 active:bg-green-600 text-white",
    outline:
      "hover:bg-green-50 active:bg-green-50 text-green-600 border border-green-300",
    faded: "bg-green-50 text-green-500 hover:bg-green-100 active:bg-green-100",
    clear: "bg-transparent hover:bg-green-50 active:bg-green-50 text-green-500",
  },
};

export default function useColors({
  color,
  variant,
}: {
  color: UIColors;
  variant: UIVariants;
}) {
  return COLOR_OPTIONS[color][variant];
}
