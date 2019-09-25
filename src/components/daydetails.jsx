import React, { useState } from "react";
import Img from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faMapPin,
  faMapMarker,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";

const DayDetails = ({ title, date, place, images, description }) => {
  const [isMarked, setMarked] = useState(false);
  const [currentModal, setModal] = useState(false);
  return (
    <article className="media">
      <figure className="media-left">{/* Some other nice big icon */}</figure>
      <div className="media-content">
        <h6 class="subtitle is-6">
          <span className="icon">
            <FontAwesomeIcon icon={faCalendarDay} />
          </span>
          {new Date(date).toLocaleDateString()}
          <span className="icon">
            <FontAwesomeIcon icon={faMapPin} />
          </span>
          {place}
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
          onClick={() => setMarked(!isMarked)}
          className="icon"
        >
          <FontAwesomeIcon icon={isMarked ? faMapMarker : faMapMarkerAlt} />
        </span>
      </div>
    </article>
  );
};

export default DayDetails;
