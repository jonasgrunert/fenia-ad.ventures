import React from "react";
import Header from "./navbar";
import DayDetails from "../components/daydetails";
import { graphql } from "gatsby";
import { ComposableMap, Geographies, Geography, ZoomableGroup, Markers, Marker } from "react-simple-maps";
import mapData from "./map.json";

export default ({ data }) => {
  return (
    <>
      <Header />
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <ComposableMap
            width={150}
            height={200}
            style={{
              maxWidth: "450px",
              width: "100%",
              height: "auto",
              margin: "auto"
            }}
          >
            <ZoomableGroup zoom={3} center={[100, 15]}>
              <Geographies geography={mapData}>
                {(geographies, projection) => geographies.map((geography, i) =>
                  <Geography
                    key={i}
                    geography={geography}
                    projection={projection}
                    style={{
                      default: {
                        stroke: "#607D8B",
                        fill: "#fff",
                        outline: "none",
                        strokeWidth: 0.25
                      },
                      hover: {
                        stroke: "#607D8B",
                        fill: "#fff",
                        outline: "none",
                        strokeWidth: 0.5
                      },
                      pressed: {
                        stroke: "#607D8B",
                        fill: "#607D8B",
                        outline: "none",
                        strokeWidth: 0.0
                      }
                    }}
                  />)}
              </Geographies>
              <Markers>
                {data.markdownRemark.frontmatter.diary.map(entry => <Marker marker={{ name: entry.place.name, coordinates: JSON.parse(entry.place.position).coordinates }} />)}
              </Markers>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {data.markdownRemark.frontmatter.diary.map(entry => (
            <DayDetails
              title={entry.title}
              description={entry.description}
              date={entry.date}
              place={entry.place.name}
              images={entry.images}
            />
          ))}
        </div>
      </section>
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
          place {
            position
            name
          }
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
