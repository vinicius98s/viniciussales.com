import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { TransitionState } from 'gatsby-plugin-transition-link';

import LayoutContext from 'src/components/LayoutContext';
import SEO from 'src/components/SEO';
import Card from 'src/components/Card';
import Button from 'src/components/Button';

import { projects } from 'src/utils/constants';

import {
  StyledH1,
  StyledText,
  ProjectInfoWrapper,
  ProjectWrapper,
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

  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <>
          <SEO
            title="Projects"
            keywords={[`Vinicius Sales`, `projects`, `Front-end`, 'react']}
          />
          <LayoutContext>
            <StyledH1>Projects</StyledH1>
            <StyledText>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur
              odio, quia quae cupiditate eius est vitae dolorum, iste impedit cumque
              facilis quas sapiente! Placeat mollitia reprehenderit ratione?
              Excepturi, placeat ducimus?
            </StyledText>
            {projects.map(project => (
              <Card
                key={project.pathToRepository}
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
                <ProjectWrapper>
                  <ImageWrapper>
                    <Img fluid={getProjectImage(project.imageName)} />
                  </ImageWrapper>
                  <ProjectInfoWrapper>
                    <StyledH1>{project.name}</StyledH1>
                    <StyledText>{project.description}</StyledText>
                    <Button
                      margin={{
                        top: 'default',
                        right: 'none',
                        bottom: 'none',
                        left: 'none',
                      }}
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
                </ProjectWrapper>
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
            fluid(maxHeight: 250, quality: 100) {
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
