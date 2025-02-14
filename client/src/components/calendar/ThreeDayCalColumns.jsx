export default function ThreeDayCalColumns({ firstDate, events }) {
  function findDate(startDate, offset) {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + offset);
    return newDate;
  }

  const dates = [firstDate, findDate(firstDate, 1), findDate(firstDate, 2)];

  return (
    <div className="h-[calc(100vh-6rem)] w-[calc(100vw-1.5rem)] fixed flex">
      {dates.map((date) => (
        <div className="mx-1 p-1 w-1/3 h-full bg-blue-500">
          <div>{date.toDateString()}</div>
          <div></div>
        </div>
      ))}
    </div>
  );
}
