import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Source Sans Pro', sans-serif;
	}

	body {
		color: ${(p) => p.theme.colors.white};
	}

	li {
		list-style: none;
	}

	a {
		text-decoration: none;
		color: ${(p) => p.theme.colors.white};
	}
`;

export default GlobalStyles;
