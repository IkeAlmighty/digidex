// displays events from events prop, ignoring any that do not start
// on the same date as the date prop speecifies.
export default function EventColumn({ date, events }) {
  
  return (
    <>
      <div className="">{date.toDateString()}</div>
      <div></div>
    </>
  );
}
