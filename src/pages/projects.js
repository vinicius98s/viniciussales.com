import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { TransitionState } from 'gatsby-plugin-transition-link';

import LayoutContext from 'src/components/LayoutContext';
import SEO from 'src/components/SEO';
import Card from 'src/components/Card';
import Button from 'src/components/Button';
import PostTags from 'src/components/PostTags';

import { projects } from 'src/utils/constants';
import useWindowSize from 'src/utils/useWindowSize';

import {
  StyledH1,
  StyledText,
  ProjectInfoWrapper,
  ImageWrapper,
} from 'src/assets/styles';

const Projects = ({ data }) => {
  const projectsImages = data.allFile.edges;

  const getProjectImage = name => {
    const projectImage = projectsImages.find(image =>
      decodeURI(image.node.childImageSharp.fluid.src).includes(name)
    );

    return projectImage.node.childImageSharp.fluid;
  };

  const [windowWidth] = useWindowSize();
  const WIDTH_BREAKPOINT = 820;

  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <>
          <SEO
            title="Projects"
            keywords={[
              `Vinicius Sales`,
              `projects`,
              `front-end`,
              'development',
              'React',
              'Vue',
              'JavaScript',
              'Nodejs',
            ]}
          />
          <LayoutContext>
            <StyledH1>Projects</StyledH1>
            <StyledText>
              Here you can find most of my personal projects and a link for
              their repositories.
            </StyledText>
            {projects.map(project => (
              <Card
                key={project.pathToRepository}
                flexDirection={
                  windowWidth < WIDTH_BREAKPOINT ? 'column' : 'row'
                }
                margin={{
                  top: 'medium',
                  right: 'none',
                  bottom: 'none',
                  left: 'none',
                }}
                animation={
                  transitionStatus === 'entering' ||
                  transitionStatus === 'entered'
                }
              >
                <ImageWrapper minWidth={windowWidth > WIDTH_BREAKPOINT}>
                  <Img
                    fluid={getProjectImage(project.imageName)}
                    alt={project.name}
                  />
                </ImageWrapper>
                <ProjectInfoWrapper
                  marginTop={windowWidth < WIDTH_BREAKPOINT}
                  marginLeft={windowWidth > WIDTH_BREAKPOINT}
                >
                  <StyledH1>{project.name}</StyledH1>
                  <StyledText>{project.description}</StyledText>
                  <PostTags tags={project.techs} justifyContent="flex-start" />
                  <Button
                    margin={{
                      top: 'default',
                      right: 'none',
                      bottom: 'none',
                      left: 'none',
                    }}
                    fontSize="16px"
                  >
                    <a
                      href={project.pathToRepository}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Repository
                    </a>
                  </Button>
                </ProjectInfoWrapper>
              </Card>
            ))}
          </LayoutContext>
        </>
      )}
    </TransitionState>
  );
};

export const imagesQuery = graphql`
  query {
    allFile(filter: { relativeDirectory: { regex: "/projects/" } }) {
      edges {
        node {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

Projects.propTypes = {
  data: PropTypes.object,
};

export default Projects;
