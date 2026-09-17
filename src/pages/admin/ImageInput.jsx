import { useState } from "react";
import { uploadImage } from "../../lib/api";

const ImageInput = ({ label, value, onChange, folder }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload gagal");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm text-zinc-300 mb-1">{label}</label>
      {value && (
        <img
          src={value}
          alt={label}
          className="w-32 h-32 object-cover rounded-md mb-2 bg-zinc-700"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="block w-full text-sm text-zinc-300 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-zinc-700 file:text-white hover:file:bg-zinc-600"
      />
      {uploading && <p className="text-xs text-blue-300 mt-1">Uploading...</p>}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
};

export default ImageInput;
