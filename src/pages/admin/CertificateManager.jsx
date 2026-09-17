import { useEffect, useState } from "react";
import {
  fetchCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  reorderItems,
} from "../../lib/api";
import ImageInput from "./ImageInput";
import SortableList from "./SortableList";

const emptyForm = { nama: "", gambar_url: "" };

const CertificateManager = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => fetchCertificates().then(setItems);

  useEffect(() => {
    load();
  }, []);

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({ nama: item.nama, gambar_url: item.gambar_url });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (editingId) {
      await updateCertificate(editingId, form);
    } else {
      const maxOrder = items.reduce((m, i) => Math.max(m, i.order_index), -1);
      await createCertificate({ ...form, order_index: maxOrder + 1 });
    }
    setSaving(false);
    cancelEdit();
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus sertifikat ini?")) return;
    await deleteCertificate(id);
    load();
  };

  const handleReorder = async (newItems) => {
    setItems(newItems);
    await reorderItems(
      "certificates",
      newItems.map((item) => item.id)
    );
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-4">
          {editingId ? "Edit Sertifikat" : "Tambah Sertifikat"}
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
          <ImageInput
            label="Gambar"
            value={form.gambar_url}
            onChange={(url) => setForm({ ...form, gambar_url: url })}
            folder="certificates"
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
          Daftar Sertifikat ({items.length})
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
                  className="w-12 h-12 object-cover rounded bg-white"
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

export default CertificateManager;
