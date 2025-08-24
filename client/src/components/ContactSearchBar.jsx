export default function ContactSearchBar({ onChange, dataset }) {
  function handleOnChange(e) {
    const results = dataset.filter((contact) =>
      JSON.stringify(contact).toLowerCase().includes(e.target.value)
    );

    onChange(results);
  }

  return (
    <>
      <input
        className="px-3 border-2 rounded"
        type="search"
        placeholder="search..."
        onChange={handleOnChange}
      />
    </>
  );
}
