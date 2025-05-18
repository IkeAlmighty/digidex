export default function TimeSpanButton({ text, selected, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className={`cursor-pointer px-3 py-1 m-1 text-[0.7rem] font-semibold bg-lime-600 text-white rounded-lg hover:bg-lime-200 hover:text-black`}
      >
        {text}
      </button>
      {selected === text && (
        <hr className="mt-1 border-t-2 border-blue-500 mx-3" />
      )}
    </div>
  );
}
