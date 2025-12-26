export default function FilterBySelector({
  options,
  selectedOption,
  onChange,
}) {
  return (
    <div className="flex flex-row items-center space-x-2 p-2">
      <div>filter by:</div>
      {options &&
        options.map((option) => (
          <button
            key={option}
            className={`px-2 y-1 rounded-2xl border-2 cursor-po ${
              selectedOption === option
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
    </div>
  );
}
