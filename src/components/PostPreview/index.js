import React from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";

import { StyledPostPreview } from "./styled";

import Button from "../Button";

const PostPreview = props => {
    return (
        <StyledPostPreview>
            <Link to={props.post.frontmatter.path}>
                <Img fluid={props.post.frontmatter.previewImage.childImageSharp.fluid} />
                <div className="info">
                    <h1>{props.post.frontmatter.title}</h1>
                    <Button title="Read" />
                </div>
            </Link>
        </StyledPostPreview>
    );
};

export default PostPreview;
