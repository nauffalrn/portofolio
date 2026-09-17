import { useEffect, useState } from "react";
import {
  fetchExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  reorderItems,
} from "../../lib/api";
import ImageInput from "./ImageInput";
import ListInput from "./ListInput";
import PhotoListInput from "./PhotoListInput";
import SortableList from "./SortableList";

const emptyForm = {
  company: "",
  position: "",
  type: "",
  duration: "",
  location: "",
  description: [],
  skills: [],
  logo_url: "",
  photos: [],
};

const ExperienceManager = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => fetchExperiences().then(setItems);

  useEffect(() => {
    load();
  }, []);

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      company: item.company,
      position: item.position,
      type: item.type,
      duration: item.duration,
      location: item.location,
      description: item.description || [],
      skills: item.skills || [],
      logo_url: item.logo_url,
      photos: item.photos || [],
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (editingId) {
      await updateExperience(editingId, form);
    } else {
      const maxOrder = items.reduce((m, i) => Math.max(m, i.order_index), -1);
      await createExperience({ ...form, order_index: maxOrder + 1 });
    }
    setSaving(false);
    cancelEdit();
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus pengalaman ini?")) return;
    await deleteExperience(id);
    load();
  };

  const handleReorder = async (newItems) => {
    setItems(newItems);
    await reorderItems(
      "experiences",
      newItems.map((item) => item.id)
    );
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-4">
          {editingId ? "Edit Pengalaman" : "Tambah Pengalaman"}
        </h2>
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="col-span-2">
              <label className="block text-sm text-zinc-300 mb-1">
                Perusahaan
              </label>
              <input
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-300 mb-1">
                Posisi
              </label>
              <input
                required
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Tipe</label>
              <input
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                placeholder="Internship / Full-time"
                className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-300 mb-1">
                Durasi
              </label>
              <input
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="Jul 2025 - Sep 2025"
                className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-300 mb-1">
                Lokasi
              </label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <ImageInput
            label="Logo perusahaan"
            value={form.logo_url}
            onChange={(url) => setForm({ ...form, logo_url: url })}
            folder="experience"
          />

          <ListInput
            label="Deskripsi (bullet points)"
            items={form.description}
            onChange={(description) => setForm({ ...form, description })}
          />

          <ListInput
            label="Skills"
            items={form.skills}
            onChange={(skills) => setForm({ ...form, skills })}
          />

          <PhotoListInput
            label="Foto dokumentasi"
            photos={form.photos}
            onChange={(photos) => setForm({ ...form, photos })}
            folder="experience"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold transition-colors"
            >
              {saving ? "Menyimpan..." : editingId ? "Update" : "Tambah"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-5 py-2 rounded-md bg-zinc-700 hover:bg-zinc-600 text-white transition-colors"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-4">
          Daftar Pengalaman ({items.length})
        </h2>
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <SortableList
            items={items}
            onReorder={handleReorder}
            renderItem={(item) => (
              <div className="flex items-center gap-3 bg-zinc-800 p-3 rounded-md">
                {item.logo_url && (
                  <img
                    src={item.logo_url}
                    alt={item.company}
                    className="w-12 h-12 object-contain rounded bg-white"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {item.position}
                  </p>
                  <p className="text-xs text-zinc-400 truncate">
                    {item.company}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => startEdit(item)}
                    className="px-2 py-1 rounded bg-blue-900/50 text-blue-300 text-xs hover:bg-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 rounded bg-red-900/50 text-red-300 text-xs hover:bg-red-900"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ExperienceManager;
