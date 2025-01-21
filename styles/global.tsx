import { Global, css } from "@emotion/react";
import theme from "./theme";

import "react-medium-image-zoom/dist/styles.css";

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        :root {
          color-scheme: dark;
        }

        [data-rmiz-modal-overlay="visible"] {
          background-color: rgb(0, 0, 0, 0.8);
        }

        [data-rmiz-btn-unzoom] {
          cursor: pointer;
          :focus-visible {
            outline-offset: 0.4rem;
            outline: 0.2rem solid ${theme.colors.darkGray};
          }
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Source Sans Pro", sans-serif;
        }

        body {
          color: ${theme.colors.white};
          overflow-y: scroll;
        }

        li {
          list-style: none;
        }

        a {
          text-decoration: none;
          color: ${theme.colors.white};
        }
      `}
    />
  );
}
