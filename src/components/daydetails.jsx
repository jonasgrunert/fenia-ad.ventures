import React, { useReducer, useEffect } from "react";
import Img from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faMapPin,
  faMapMarker,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";

const onSwipe = map => {
  let startX, endX, startY, endY;
  const setStart = e => {
    startX = e.changedTouches[0].pageX;
    startY = e.changedTouches[0].pageY;
  };
  const setEnd = e => {
    endX = e.changedTouches[0].pageX;
    endY = e.changedTouches[0].pageY;
    const diffX = startX - endX;
    const diffY = startY - endY;
    startX = startY = endX = endY = undefined;
    if (Math.abs(diffX) > 100 || Math.abs(diffY) > 100) {
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && map.left) {
          map.right();
        }
        if (diffX < 0 && map.right) {
          map.left();
        }
      } else {
        if (diffY > 0 && map.up) {
          map.up();
        }
        if (diffY > 0 && map.down) {
          map.down();
        }
      }
    }
  };
  document.addEventListener("touchstart", setStart);
  document.addEventListener("touchend", setEnd);
  return () => {
    document.removeEventListener("touchstart", setStart);
    document.removeEventListener("touchend", setEnd);
  };
};

const createReducer = length => (state, action) => {
  switch (action) {
    case "left":
      return state !== false ? (state === 0 ? length - 1 : state - 1) : state;
    case "right":
      return state !== false ? (state === length - 1 ? 0 : state + 1) : state;
    case "close":
      return false;
    default:
      return action;
  }
};

const DayDetails = ({
  title,
  date,
  place,
  images,
  description,
  index,
  isSelected,
  onSelect
}) => {
  const [currentModal, dispatch] = useReducer(
    createReducer(images.length),
    false
  );

  const keylistener = e => {
    if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
      e.preventDefault();
    }
    switch (e.code) {
      case "ArrowLeft": {
        dispatch("left");
        break;
      }
      case "ArrowRight": {
        dispatch("right");
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keylistener);
    const deSwipe = onSwipe({
      left: () => dispatch("left"),
      right: () => dispatch("right")
    });
    return () => {
      document.removeEventListener("keydown", keylistener);
      deSwipe();
    };
  }, []);
  return (
    <>
      <article className="media">
        <div
          className="media-content"
          style={{ overflow: "hidden", marginBottom: "1em" }}
        >
          <h2 className="title is-4">{title}</h2>
          <h6 class="subtitle is-6" style={{ marginBottom: "0.3em" }}>
            <span className="icon">
              <FontAwesomeIcon icon={faCalendarDay} />
            </span>
            {" " + new Date(date).toLocaleDateString()}
            <span className="icon">
              <FontAwesomeIcon icon={faMapPin} />
            </span>
            {" " + place}
          </h6>
          <p className="content">{description}</p>
        </div>
        <div className="media-right">
          <span
            role="button"
            tabIndex={0}
            onClick={() => onSelect(index)}
            className="icon is-large"
          >
            <FontAwesomeIcon
              icon={isSelected ? faMapMarkerAlt : faMapMarker}
              size="3x"
            />
          </span>
        </div>
      </article>
      <ul
        style={{
          whiteSpace: "nowrap",
          overflow: "auto",
          marginBottom: "2em"
        }}
      >
        {images.map((image, idx) => (
          <>
            <li
              role="button"
              tabIndex={0}
              onClick={() => dispatch(idx)}
              style={{ paddingRight: "10px", display: "inline-block" }}
            >
              <figure
                className="image"
                style={{
                  height: "128px"
                }}
              >
                <img
                  alt={image.name}
                  src={`/img/${image.image.relativePath}?nf_resize=fit&h=128`}
                  height={128}
                  style={{
                    height: "128px",
                    objectFit: "cover"
                  }}
                />
              </figure>
            </li>
            <div className={`modal ${currentModal === idx ? "is-active" : ""}`}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => dispatch("close")}
                class="modal-background"
              ></div>
              <div className="modal-content">
                <p className="image">
                  <img
                    alt={image.name}
                    src={`/img/${image.image.relativePath}?nf_resize=fit&w=1080`}
                    style={{
                      maxHeight: "85vh",
                      objectFit: "cover",
                      margin: "auto",
                      display: "block",
                      width: "auto"
                    }}
                  />
                </p>
                {image.name && (
                  <div className="box">
                    <h1 className="subtitle">{image.name}</h1>
                  </div>
                )}
              </div>
              <button
                onClick={() => dispatch("close")}
                className="modal-close is-large"
                aria-label="close"
              ></button>
            </div>
          </>
        ))}
      </ul>
    </>
  );
};

export default DayDetails;
