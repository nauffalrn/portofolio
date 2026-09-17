import { uploadImage } from "../../lib/api";

const PhotoListInput = ({ label, photos, onChange, folder }) => {
  const update = (index, field, value) => {
    const next = [...photos];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const remove = (index) => onChange(photos.filter((_, i) => i !== index));

  const add = () => onChange([...photos, { src: "", caption: "" }]);

  const handleFile = async (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file, folder);
    update(index, "src", url);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm text-zinc-300 mb-1">{label}</label>
      <div className="space-y-3">
        {photos.map((photo, index) => (
          <div key={index} className="flex gap-3 items-start bg-zinc-900/50 p-3 rounded-md">
            {photo.src && (
              <img
                src={photo.src}
                alt={photo.caption || "photo"}
                className="w-16 h-16 object-cover rounded bg-zinc-700 flex-shrink-0"
              />
            )}
            <div className="flex-1 space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(index, e)}
                className="block w-full text-xs text-zinc-300 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-zinc-700 file:text-white"
              />
              <input
                type="text"
                placeholder="Caption"
                value={photo.caption}
                onChange={(e) => update(index, "caption", e.target.value)}
                className="w-full px-3 py-1.5 rounded-md bg-zinc-700 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="px-3 py-1 rounded-md bg-red-900/50 text-red-300 hover:bg-red-900 text-sm"
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
        + Tambah foto
      </button>
    </div>
  );
};

export default PhotoListInput;
