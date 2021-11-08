import React, { useState } from "react";

const Timelinecardcomponent = ({ time, title, description }: any) => {
  const [selected, setselected] = useState(false);

  function expand() {
    selected ? setselected(false) : setselected(true);
  }

  return (
    <div className={selected ? "selectedcard" : "card"} onClick={expand}>
      <div className="time">
        <div className="timedisplay">{time}</div>
      </div>
      <div className="description">
        {title}
        <br />
        <br />
        {description}
      </div>
    </div>
  );
};

export default Timelinecardcomponent;
