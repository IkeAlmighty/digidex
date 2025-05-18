import { useState, useEffect } from "react";
import TimeSpanButton from "../components/calendar/TimeSpanButton";
import ThreeDayCalColumns from "../components/calendar/ThreeDayCalColumns";
import { getEvents } from "../api/events";
import Navigation from "../components/Navigation";

function CalendarPage() {
  const [timeSpanSelected, setTimeSpanSelected] = useState("3 Day");
  const [today, setToday] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setEvents(await getEvents(today));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="p-3">
        <div>
          <div className="py-2 flex items-end justify-content">
            {["1 Day", "3 Day", "1 Week", "1 Month"].map((text, index) => (
              <TimeSpanButton
                key={`timespan-${index}`}
                text={text}
                selected={timeSpanSelected}
                onClick={() => setTimeSpanSelected(text)}
              />
            ))}
          </div>
        </div>
        {timeSpanSelected === "3 Day" && (
          <ThreeDayCalColumns firstDate={today} events={events} />
        )}
      </div>
    </div>
  );
}

export default CalendarPage;
