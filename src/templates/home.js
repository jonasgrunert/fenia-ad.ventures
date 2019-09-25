import React from "react";
import Header from "./navbar";
import DayDetails from "../components/daydetails";

export default () => {
  return (
    <>
      <Header />
      {/*map*/}{" "}
      <DayDetails
        title="Test Title"
        description="This was a wonderful day"
        date="12/34/2019"
        place="here"
      />
    </>
  );
};
