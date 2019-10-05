import React, { useState, useEffect } from "react";
import Img from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faMapPin,
  faMapMarker,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";

const onSwipe = (kind, action) => {
  let startX, endX, startY, endY;
  const setStart = (_, e) => {
    e.preventDefault();
    startX = e.changedTouches[0].pageX;
    startY = e.changedTouches[0].pageY;
  }
  const setEnd = (_, e) => {
    e.preventDefault();
    endX = e.changedTouches[0].pageX;
    endY = e.changedTouches[0].pageY;
    const diffX = startX - endX;
    const diffY = startY - endY;
    if (Math.abs(diffX) > 100 || Math.abs(diffY) > 100) {
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && kind === "left") {
          action()
        }
        if (diffX < 0 && kind === "right") {
          action()
        }
      } else {
        if (diffY > 0 && kind === "up") {
          action()
        }
        if (diffY > 0 && kind === "down") {
          action()
        }
      }
    }
  }
  const prevent = (_, e) => { e.preventDefault() }
  document.addEventListener('touchstart', setStart);
  document.addEventListener('touchend', setEnd);
  document.addEventListener('touchmove', prevent)
  return () => {
    document.removeEventListener('touchstart', setStart);
    document.removeEventListener('touchend', setEnd);
    document.removeEventListener('touchmove', prevent);
  }
}

const DayDetails = ({ title, date, place, images, description, index, isSelected, onSelect }) => {
  const [currentModal, setModal] = useState(false);

  const keylistener = (_, e) => {
    switch (e.code) {
      case "ArrowLeft": {
        if (currentModal) { if (currentModal === 0) { setModal(images.length - 1) } else { setModal(currentModal - 1) } };
        break;
      }
      case "ArrowRight": {
        if (currentModal) { if (currentModal === images.length - 1) { setModal(0) } else { setModal(currentModal + 1) } };
        break;
      }
      default: break;
    }
  }

  useEffect(() => {
    document.addEventListener('keypress', keylistener);
    const onLeft = onSwipe("left", () => { if (currentModal) { if (currentModal === 0) { setModal(images.length - 1) } else { setModal(currentModal - 1) } }; });
    const onRight = onSwipe("rigth", () => { if (currentModal) { if (currentModal === images.length - 1) { setModal(0) } else { setModal(currentModal + 1) } }; });
    return () => {
      document.removeEventListener('keypress', keylistener);
      onLeft();
      onRight();
    };
  })
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
        {images.map((image, idx) => (
          <>
            <figure
              className="image"
              role="button"
              tabIndex={0}
              onClick={() => setModal(idx)}
            >
              <Img fixed={image.image.childImageSharp.fixed} alt={image.name} />
            </figure>
            <div className={`modal ${currentModal === idx ? "is-active" : ""}`}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setModal(false)}
                class="modal-background"
              ></div>
              <div class="modal-content">
                <p class="image">
                  <Img
                    fluid={image.image.childImageSharp.fluid}
                    alt={image.name}
                  />
                </p>
              </div>
              <button
                onClick={() => setModal(false)}
                class="modal-close is-large"
                aria-label="close"
              ></button>
            </div>
          </>
        ))}
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
