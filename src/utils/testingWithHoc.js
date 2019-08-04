/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { ThemeContext } from 'src/components/LayoutContext';
import theme from 'src/assets/theme';

export default component => {
  return {
    ...render(
      <ThemeContext.Provider
        value={{ colorTheme: 'light', toggleTheme: jest.fn() }}
      >
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </ThemeContext.Provider>
    ),
  };
};
