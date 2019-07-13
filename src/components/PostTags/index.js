import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import Button from '../Button';

import { TagsWrapper } from './styles';

const PostTags = ({ tags, justifyContent, alignItems, theme }) => (
    <TagsWrapper justifyContent={justifyContent} alignItems={alignItems}>
        {tags.length &&
            tags.map((tag, index) => (
                <Button
                    customColor="#595959"
                    fontColor={theme.colors.white}
                    fontSize="13px"
                    key={`${tag}-${index}`}
                    padding="4px 10px"
                    fontWeight="medium"
                    borderRadius={{
                        topLeft: '5px',
                        topRight: '5px',
                        bottomLeft: '5px',
                        bottomRight: '5px',
                    }}
                >
                    {tag}
                </Button>
            ))}
    </TagsWrapper>
);

PostTags.propTypes = {
    alignItems: PropTypes.string,
    justifyContent: PropTypes.string,
    tags: PropTypes.array.isRequired,
};

export default withTheme(PostTags);
