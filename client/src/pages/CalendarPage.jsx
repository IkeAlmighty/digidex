import { useState } from "react";
import TimeSpanButton from "../components/calendar/TimeSpanButton";
import ThreeDayCalColumns from "../components/calendar/ThreeDayCalColumns";

function CalendarPage() {
  const [timeSpanSelected, setTimeSpanSelected] = useState("3 Day");
  const [today, setToday] = useState(new Date());

  return (
    <div className="m-3">
      <div className="flex">
        <h1 className="w-1/2 p-2">Your Calendar</h1>
        <div className="w-1/2 p-2 flex items-end justify-content">
          {["1 Day", "3 Day", "1 Week", "1 Month"].map((text, index) => (
            <TimeSpanButton
              key={`timespan-${index}`}
              text={text}
              selected={timeSpanSelected}
              onClick={() => setTimeSpanSelected(text)}
            />
          ))}
          {/* TODO: suggested place for a nav hamburger */}
        </div>
      </div>
      {timeSpanSelected === "3 Day" && (
        <ThreeDayCalColumns firstDate={today} events={[]} />
      )}
    </div>
  );
}

export default CalendarPage;
