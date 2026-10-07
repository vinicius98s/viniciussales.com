import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-plugin-prettier";

const config = [
  ...nextCoreWebVitals,
  {
    plugins: {
      prettier,
    },

    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    ignores: [".next/**", "public/**", "next-env.d.ts"],
  },
];

export default config;
