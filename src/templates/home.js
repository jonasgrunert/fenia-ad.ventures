import React from "react";
import Header from "./navbar";
import DayDetails from "../components/daydetails";
import { graphql } from "gatsby";

export default ({ data }) => {
  return (
    <>
      <Header />
      {/*map*/}
      {data.markdownRemark.frontmatter.diary.map(entry => (
        <DayDetails
          title={entry.title}
          description={entry.description}
          date={entry.date}
          place={entry.place}
          images={entry.images}
        />
      ))}
    </>
  );
};

export const query = graphql`
  query HomaPageQuery($id: String) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        diary {
          date
          description
          place
          title
          images {
            name
            image {
              childImageSharp {
                fixed(height: 128) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;
