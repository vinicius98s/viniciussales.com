import React from 'react';

import testingWithHoc from 'src/utils/testingWithHoc';
import PostsPreview from '../index';
import posts from '../__mocks__';

const defaultProps = {
  posts,
};

describe('<PostsPreview />', () => {
  test('should render with correct post title', () => {
    const { queryByText } = testingWithHoc(<PostsPreview {...defaultProps} />);

    expect(
      queryByText(defaultProps.posts[0].node.frontmatter.title)
    ).toBeTruthy();
  });
});
