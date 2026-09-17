import { useEffect, useState } from "react";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  reorderItems,
} from "../../lib/api";
import ImageInput from "./ImageInput";
import ListInput from "./ListInput";
import SortableList from "./SortableList";

const emptyForm = { nama: "", gambar_url: "", desk: "", tools: [] };

const ProjectManager = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => fetchProjects().then(setItems);

  useEffect(() => {
    load();
  }, []);

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      nama: item.nama,
      gambar_url: item.gambar_url,
      desk: item.desk,
      tools: item.tools || [],
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
      await updateProject(editingId, form);
    } else {
      const maxOrder = items.reduce((m, i) => Math.max(m, i.order_index), -1);
      await createProject({ ...form, order_index: maxOrder + 1 });
    }
    setSaving(false);
    cancelEdit();
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus project ini?")) return;
    await deleteProject(id);
    load();
  };

  const handleReorder = async (newItems) => {
    setItems(newItems);
    await reorderItems(
      "projects",
      newItems.map((item) => item.id)
    );
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-4">
          {editingId ? "Edit Project" : "Tambah Project"}
        </h2>
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label className="block text-sm text-zinc-300 mb-1">Nama</label>
            <input
              required
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-zinc-300 mb-1">
              Deskripsi
            </label>
            <textarea
              rows={4}
              value={form.desk}
              onChange={(e) => setForm({ ...form, desk: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <ImageInput
            label="Gambar"
            value={form.gambar_url}
            onChange={(url) => setForm({ ...form, gambar_url: url })}
            folder="projects"
          />
          <ListInput
            label="Tools / Tech Stack"
            items={form.tools}
            onChange={(tools) => setForm({ ...form, tools })}
            placeholder="React"
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
          Daftar Project ({items.length})
        </h2>
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <SortableList
            items={items}
            onReorder={handleReorder}
            renderItem={(item) => (
              <div className="flex items-center gap-3 bg-zinc-800 p-3 rounded-md">
                <img
                  src={item.gambar_url}
                  alt={item.nama}
                  className="w-12 h-12 object-cover rounded"
                />
                <span className="flex-1 text-sm text-white truncate">
                  {item.nama}
                </span>
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

export default ProjectManager;
