import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Button as child for the tooltip
import Button from 'src/components/Button';

import testingWithHoc from 'src/utils/testingWithHoc';
import Tooltip from '../index';

const defaultProps = {
  title: 'This is a test',
};

afterEach(cleanup);

describe('<Tooltip />', () => {
  test('should render it`s child', () => {
    const { container } = testingWithHoc(
      <Tooltip {...defaultProps}>
        <Button />
      </Tooltip>
    );

    const button = container.querySelector('button');

    expect(button).toBeInTheDocument();
  });

  test('should display the tooltip on mouse over', () => {
    const { queryByText, queryByTestId } = testingWithHoc(
      <Tooltip {...defaultProps}>
        <Button />
      </Tooltip>
    );

    const tooltip = queryByTestId('tooltip');
    fireEvent.mouseEnter(tooltip);

    expect(queryByText(defaultProps.title)).toBeTruthy();
  });
});
