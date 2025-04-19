import { findDateFrom } from "../../utils/dates";
import EventColumn from "../EventColumn";

export default function ThreeDayCalColumns({ firstDate, events }) {

  const dates = [firstDate, findDateFrom(firstDate, 1), findDateFrom(firstDate, 2)];

  return (
    <div className="h-[calc(100vh-6rem)] w-[calc(100vw-1.5rem)] fixed flex">
      {dates.map((date, index) => (
        <div className="mx-1 p-1 w-1/3 h-full bg-blue-500" key={`col-${index}`}>
          <EventColumn date={date} events={events} />
        </div>
      ))}
    </div>
  );
}
