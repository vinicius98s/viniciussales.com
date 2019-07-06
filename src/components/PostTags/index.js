import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import { TagsWrapper } from './styles';
import colorsHelpers from './colorsHelpers';

const PostTags = ({ tags, justifyContent, alignItems }) => (
    <TagsWrapper justifyContent={justifyContent} alignItems={alignItems}>
        {tags.length &&
            tags.map((tag, index) => (
                <Button
                    customColor={colorsHelpers[tag.toLowerCase()].color}
                    customColorHover={colorsHelpers[tag.toLowerCase()].hover}
                    fontSize="12px"
                    fontColor="white"
                    key={`${tag}-${index}`}
                    padding="4px 10px"
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

export default PostTags;
