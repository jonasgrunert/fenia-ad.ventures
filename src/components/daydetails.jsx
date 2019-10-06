import React, { useReducer, useEffect } from "react";
import Img from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faMapPin,
  faMapMarker,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";

const onSwipe = (map) => {
  let startX, endX, startY, endY;
  const setStart = (e) => {
    e.preventDefault();
    startX = e.changedTouches[0].pageX;
    startY = e.changedTouches[0].pageY;
  }
  const setEnd = (e) => {
    e.preventDefault();
    endX = e.changedTouches[0].pageX;
    endY = e.changedTouches[0].pageY;
    const diffX = startX - endX;
    const diffY = startY - endY;
    startX = startY = endX = endY = undefined;
    if (Math.abs(diffX) > 100 || Math.abs(diffY) > 100) {
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && map.left) {
          map.left();
        }
        if (diffX < 0 && map.right) {
          map.right();
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
  }
  document.addEventListener('touchstart', setStart);
  document.addEventListener('touchend', setEnd);
  return () => {
    document.removeEventListener('touchstart', setStart);
    document.removeEventListener('touchend', setEnd);
  }
}

const createReducer = length => (state, action) => {
  switch (action) {
    case "left": return state !== false ? (state === 0 ? length - 1 : state - 1) : state;
    case "right": return state !== false ? (state === length - 1 ? 0 : state + 1) : state;
    case "close": return false;
    default: return action;
  }
}

const DayDetails = ({ title, date, place, images, description, index, isSelected, onSelect }) => {
  const [currentModal, dispatch] = useReducer(createReducer(images.length), false);

  const keylistener = (e) => {
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
      default: break;
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keylistener);
    const deSwipe = onSwipe({ left: () => dispatch("left"), right: () => dispatch("right") });
    return () => {
      document.removeEventListener('keydown', keylistener);
      deSwipe();
    };
  }, [])
  return (
    <article className="media">
      <figure className="media-left">{/* Some other nice big icon */}</figure>
      <div className="media-content">
        <h6 class="subtitle is-6">
          <span className="icon">
            <FontAwesomeIcon icon={faCalendarDay} />
          </span>
          {" " + new Date(date).toLocaleDateString()}
          <span className="icon">
            <FontAwesomeIcon icon={faMapPin} />
          </span>
          {" " + place}
        </h6>
        <h2 className="title is-4">{title}</h2>
        <p className="content">{description}</p>
        <ul style={{ display: "flex", flexWrap: "wrap" }}>
          {images.map((image, idx) => (
            <>
              <li
                role="button"
                tabIndex={0}
                onClick={() => dispatch(idx)}
                className="image"
                style={{ paddingRight: "10px" }}
              >
                <Img style={{ maxHeight: "100%", minWidth: "100%", objectFit: "cover", verticalAlign: "bottom" }} fixed={image.image.childImageSharp.fixed} alt={image.name} />
              </li>
              <div className={`modal ${currentModal === idx ? "is-active" : ""}`}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => dispatch("close")}
                  class="modal-background"
                ></div>
                <div class="modal-content">
                  <div class="image">
                    <Img
                      fluid={image.image.childImageSharp.fluid}
                      alt={image.name}
                    />
                  </div>
                </div>
                <button
                  onClick={() => dispatch("close")}
                  class="modal-close is-large"
                  aria-label="close"
                ></button>
              </div>
            </>
          ))}
          <li style={{ flexGrow: 10 }} />
        </ul>
      </div>
      <div className="media-right">
        <span
          role="button"
          tabIndex={0}
          onClick={() => onSelect(index)}
          className="icon is-large"
        >
          <FontAwesomeIcon icon={isSelected ? faMapMarkerAlt : faMapMarker} size="3x" />
        </span>
      </div>
    </article>
  );
};

export default DayDetails;
