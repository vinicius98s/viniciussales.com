import { Global, css } from "@emotion/react";
import theme from "./theme";

export default function GlobalStyles() {
  const white = theme.colors.white;
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Source Sans Pro", sans-serif;
        }

        body {
          color: ${white};
        }

        li {
          list-style: none;
        }

        a {
          text-decoration: none;
          color: ${white};
        }
      `}
    />
  );
}
