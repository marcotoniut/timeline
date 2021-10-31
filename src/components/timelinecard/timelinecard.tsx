import React, { useEffect, useState } from "react";
import Timelinecardcomponent from "../timelinecardcomponent";

import timelinedata from "../timelinedata.json";

const Timelinecard = () => {
  const [data, setdata] = useState([...timelinedata]);
  const [currentevent, setcurrentevent] = useState(Array);

  // function maptoarray(()=> {
  //   data.map((el) => (
  //     setcurrentevent((prevState) => [...prevState, el])
  //   ))
  // })

  useEffect(() => {
    async function changeevent() {
      await data.forEach((el, i) => {
        setTimeout(() => {
          setcurrentevent((currentarray) => {
            console.log(currentarray);
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

          //check new length of currentevent, if > 5, reduce by one
        }, i * 3000);
      });
    }

    changeevent();
  }, []);

  return (
    <div>
      {currentevent.map((el: any) => (
        <div className="event">
          <div className={el.id % 2 === 0 ? "left" : "right"}>
            <Timelinecardcomponent
              title={el.title}
              time={el.time}
              description={el.description}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timelinecard;
