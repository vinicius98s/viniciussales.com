import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import Button from '../Button';

import { TagsWrapper } from './styles';

const PostTags = ({ tags, justifyContent, alignItems, theme }) => (
  <TagsWrapper justifyContent={justifyContent} alignItems={alignItems}>
    {!!tags.length &&
      tags.map(tag => (
        <Button
          noHover
          customColor={theme.colors.darkGrey}
          fontColor={theme.colors.lightGrey}
          fontSize="13px"
          key={tag}
          padding="4px 10px"
          fontWeight="medium"
          borderRadius="4px"
          margin={{
            top: 'small',
          }}
        >
          {tag}
        </Button>
      ))}
  </TagsWrapper>
);

PostTags.propTypes = {
  theme: PropTypes.object,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  tags: PropTypes.array.isRequired,
};

export default withTheme(PostTags);
