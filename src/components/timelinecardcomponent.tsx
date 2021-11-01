const Timelinecardcomponent = ({ time, title, description }: any) => {
  return (
    <div className="card">
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
