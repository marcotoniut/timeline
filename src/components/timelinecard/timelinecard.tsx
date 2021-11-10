import React, { useEffect, useState } from "react";
import { EventData } from "../domain";
import Timelinecardcomponent from "../timelinecardcomponent";
import timelinedata from "../timelinedata.json";

const Timelinecard = () => {
  // `useState` can be initialised with either a value or by a function to a value,
  // otherwise known as a lazy value. Since your data source is non-changing and you only
  // need to sort it once, we can bundle everything closer to the initialiser.
  const [data] = useState(() =>
    [...timelinedata].sort((a, b) => (a.time > b.time ? 1 : -1))
  );
  const [currentevent, setcurrentevent] = useState<readonly EventData[]>(Array);
  // Since everything is properly typed now, we change `cardselected` to be a `number` instead,
  // due to id being  it's derived from the index in the data array.
  const [cardselected, setcardselected] = useState<null | number>(null);

  useEffect(() => {
    // async functions are those that return what's called a Promise. Unless you are going to handle
    // that promise with a callback somehow, there's really no reason to recur to that api.
    // there's no reason to have such a function.
    // `useEffect` already works in a separate context, so you can call effectful functions
    // like `setTimeout` directly in it
    //check new length of currentevent, if > 5, reduce by one
    data.forEach((el, i) => {
      setTimeout(() => {
        setcurrentevent((currentarray) => {
          if (currentarray.length >= 5) {
            const newarray = [...currentarray];
            newarray.shift();
            // A recursive `setcurrentevent`, besides being very much discouraged as a pattern as
            // it could turn into an entangled mess with unexpected React side-effects,
            // is very much unnecessary, since you are already expected to return an updated state
            // for the first state action
            return newarray;
          }
          return currentarray;
        });

        // The two setters are a bit redundant, as you can simply put the conditionals inside the
        // same callback, but it's ok
        setcurrentevent((oldArray) => [
          ...oldArray,
          {
            id: i,
            time: el.time,
            title: el.title,
            description: el.description,
          },
        ]);
      }, i * 3000);
    });
  }, [data]);

  function selected(id: number) {
    setcardselected(id);
  }

  return (
    <div className="event" data-testid="card">
      {/* In general, you want to avoid the type `any`, as it bypasses what the compiler is
      supposed to help you with.
      Not in this case, but if you don't know the type, and don't need to access any of
      its properties, then you can use the [top type](https://www.typescript-training.com/course/fundamentals-v3/11-top-and-bottom-types/#top-types)
      `unknown` instead
      */}
      {currentevent.map((el) => (
        <div className="event" key={el.id}>
          {/* No children, so better to self-close the tag */}
          <div className="timedot" />
          <div
            className={cardselected === el.id ? "selected event" : "event"}
            onClick={() => selected(el.id)}
          >
            <div className={el.id % 2 === 0 ? "left" : "right"}>
              {/* This is just some simple trick, but since the properties of Timelinecardcomponent are a perfect
              match for those of the event, you can simply ... spread over the event value into the properties of the
              JSX element.
              */}
              <Timelinecardcomponent {...el} />
            </div>
          </div>
        </div>
        // </div>
      ))}
    </div>
  );
};

export default Timelinecard;
