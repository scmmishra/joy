import { defaultColors } from "histoire";

import { defineConfig } from "histoire";
import { HstVue } from "@histoire/plugin-vue";

export default defineConfig({
  plugins: [HstVue()],
  setupFile: "/src/setup.ts",
  theme: {
    title: "Joy Design System.",
    defaultColorScheme: "light",
    favicon: "./public/joy.png",
    colors: {
      primary: defaultColors.blue,
    },
  },
});
