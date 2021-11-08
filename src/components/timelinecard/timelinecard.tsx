import React, { useEffect, useState } from "react";
import Timelinecardcomponent from "../timelinecardcomponent";

import timelinedata from "../timelinedata.json";

const Timelinecard = () => {
  const [data] = useState([...timelinedata]);
  const [currentevent, setcurrentevent] = useState(Array);
  const [cardselected, setcardselected] = useState<null | string>(null);

  useEffect(() => {
    async function changeevent() {
      console.log(data);

      const result = data.sort((a, b) => (a.time > b.time ? 1 : -1));
      console.log(result);

      //check new length of currentevent, if > 5, reduce by one
      await data.forEach((el, i) => {
        setTimeout(() => {
          setcurrentevent((currentarray) => {
            if (currentarray.length >= 5) {
              const newarray = [...currentarray];
              newarray.shift();
              setcurrentevent(newarray);
            }
            return currentarray;
          });

          setcurrentevent((oldArray) => [
            ...oldArray,
            {
              id: i,
              time: el.time,
              title: el.title,
              description: el.description,
            },
          ]);
        }, i * 5000);
      });
    }

    changeevent();
  }, [data]);

  function selected(id: string) {
    setcardselected(id);
  }

  return (
    <div className="event" data-testid="card">
      {currentevent.map((el: any) => (
        <div className="event" key={el.id}>
          <div className="timedot"></div>
          <div
            className={cardselected === el.id ? "selected event" : "event"}
            onClick={() => selected(el.id)}
          >
            <div className={el.id % 2 === 0 ? "left" : "right"}>
              <Timelinecardcomponent
                title={el.title}
                time={el.time}
                description={el.description}
              />
            </div>
          </div>
        </div>
        // </div>
      ))}
    </div>
  );
};

export default Timelinecard;
