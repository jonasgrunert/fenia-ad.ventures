import React from "react";
import { graphql } from "gatsby";
import Home from "../templates/home";

export default ({ data }) => {
  const diaries = data.posts.edges
    .map(edge => edge.node.frontmatter)
    .filter(e => e.templateKey === "home")
    .sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return aDate < bDate ? 1 : aDate > bDate ? -1 : 0;
    });
  return <Home diaries={diaries} />;
};

export const query = graphql`
  query HomePageQuery {
    posts: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            templateKey
            date
            description
            place {
              position
              name
            }
            title
            images {
              name
              image {
                relativePath
              }
            }
          }
        }
      }
    }
  }
`;
