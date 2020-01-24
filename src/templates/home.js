import React, { useReducer } from "react";
import Header from "./navbar";
import DayDetails from "../components/daydetails";
import { graphql } from "gatsby";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Markers,
  Marker
} from "react-simple-maps";
import mapData from "./map.json";

export default ({ diaries }) => {
  const [currentPoint, dispatch] = useReducer(
    (s, i) => (s === i ? false : i),
    false
  );
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
            <ZoomableGroup zoom={3} center={[100, 15]} disablePanning>
              <Geographies geography={mapData}>
                {(geographies, projection) =>
                  geographies.map((geography, i) => (
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
                    />
                  ))
                }
              </Geographies>
              <Markers>
                {diaries.map(
                  (entry, i) =>
                    entry.place.position && (
                      <Marker
                        marker={{
                          coordinates: JSON.parse(entry.place.position)
                            .coordinates
                        }}
                        style={{
                          default: {
                            fill: i === currentPoint ? "#ffdb4a" : "#666"
                          },
                          hover: {
                            fill: i === currentPoint ? "#ffdb4a" : "#666"
                          },
                          pressed: {
                            fill: i === currentPoint ? "#ffdb4a" : "#666"
                          }
                        }}
                      >
                        <circle cx={0} cy={0} r={i === currentPoint ? 3 : 1} />
                        {i === currentPoint && (
                          <text
                            textAnchor="middle"
                            y={-3}
                            x={10}
                            style={{ fill: "#666", fontSize: "0.3em" }}
                          >
                            {entry.place.name}
                          </text>
                        )}
                      </Marker>
                    )
                )}
              </Markers>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {diaries.map((entry, i) => (
            <DayDetails
              key={i}
              index={i}
              isSelected={i === currentPoint}
              onSelect={i => dispatch(i)}
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
