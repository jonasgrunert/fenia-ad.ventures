import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faMapPin,
  faMapMarker,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";

const DayDetails = ({ title, date, place, images, description }) => {
  const [isMarked, setMarked] = useState(false);
  return (
    <article className="media">
      <figure className="media-left">{/* Some other nice big icon */}</figure>
      <div className="media-content">
        <h6 class="subtitle is-6">
          <span className="icon">
            <FontAwesomeIcon icon={faCalendarDay} />
          </span>
          {date}
          <span className="icon">
            <FontAwesomeIcon icon={faMapPin} />
          </span>
          {place}
        </h6>
        <h2 className="title is-4">{title}</h2>
        <p className="content">{description}</p>
      </div>
      <div className="media-right">
        <span onClick={() => setMarked(!isMarked)} className="icon">
          <FontAwesomeIcon icon={isMarked ? faMapMarker : faMapMarkerAlt} />
        </span>
      </div>
    </article>
  );
};

export default DayDetails;
