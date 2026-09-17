const ListInput = ({ label, items, onChange, placeholder }) => {
  const update = (index, value) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const remove = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const add = () => onChange([...items, ""]);

  return (
    <div className="mb-4">
      <label className="block text-sm text-zinc-300 mb-1">{label}</label>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={item}
              placeholder={placeholder}
              onChange={(e) => update(index, e.target.value)}
              className="flex-1 px-3 py-2 rounded-md bg-zinc-700 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="px-3 rounded-md bg-red-900/50 text-red-300 hover:bg-red-900 text-sm"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 text-sm text-blue-300 hover:text-blue-200"
      >
        + Tambah
      </button>
    </div>
  );
};

export default ListInput;
