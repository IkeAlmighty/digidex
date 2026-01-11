export default function FilterBySelector({
  options,
  selectedOption,
  onChange,
}) {
  function sortWithNameAndDateFirst(a, b) {
    if (a === "name") return -1;
    else if (b === "name") return 1;
    else if (a === "date added") return -1;
    else if (b === "date added") return 1;
    else return a.localeCompare(b);
  }

  return (
    <div className="[&>*]:mx-2 [&>*]:my-1 text-xs overflow-x-scroll w-full whitespace-nowrap pt-1 pb-3">
      <span>filter by:</span>
      {options &&
        options.sort(sortWithNameAndDateFirst).map((option) => (
          <button
            key={option}
            className={`px-2 py-1 rounded-2xl border-2 cursor-pointer ${
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
