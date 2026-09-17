import { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "../../lib/api";
import ImageInput from "./ImageInput";
import ListInput from "./ListInput";

const ProfileEditor = () => {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    fetchProfile().then(setProfile);
  }, []);

  if (!profile) return <p className="text-zinc-400">Loading...</p>;

  const set = (field) => (value) =>
    setProfile((prev) => ({ ...prev, [field]: value }));

  const handleChange = (field) => (e) => set(field)(e.target.value);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const {
      id: _id,
      updated_at: _updatedAt,
      ...fields
    } = profile;
    await updateProfile(fields);
    setSaving(false);
    setSavedAt(new Date());
  };

  return (
    <form onSubmit={handleSave} className="max-w-3xl">
      <h2 className="text-xl font-bold text-white mb-4">Hero</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-zinc-300 mb-1">
            Nama lengkap (judul hero)
          </label>
          <input
            value={profile.name}
            onChange={handleChange("name")}
            className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-300 mb-1">
            Nama singkat (di profile card)
          </label>
          <input
            value={profile.short_name}
            onChange={handleChange("short_name")}
            className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-300 mb-1">
            Title / Jabatan
          </label>
          <input
            value={profile.title}
            onChange={handleChange("title")}
            className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-300 mb-1">Handle</label>
          <input
            value={profile.handle}
            onChange={handleChange("handle")}
            className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-300 mb-1">Status</label>
          <input
            value={profile.status}
            onChange={handleChange("status")}
            className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-300 mb-1">
            Teks tombol contact
          </label>
          <input
            value={profile.contact_button_text}
            onChange={handleChange("contact_button_text")}
            className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <ListInput
        label="Teks berjalan (typing effect)"
        items={profile.typed_texts || []}
        onChange={set("typed_texts")}
        placeholder="Backend Developer"
      />

      <ImageInput
        label="Foto hero"
        value={profile.hero_image_url}
        onChange={set("hero_image_url")}
        folder="profile"
      />

      <h2 className="text-xl font-bold text-white mt-8 mb-4">About</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-zinc-300 mb-1">
            Nama universitas
          </label>
          <input
            value={profile.university_name}
            onChange={handleChange("university_name")}
            className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-300 mb-1">Jurusan</label>
          <input
            value={profile.university_major}
            onChange={handleChange("university_major")}
            className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <ImageInput
        label="Logo universitas"
        value={profile.university_logo_url}
        onChange={set("university_logo_url")}
        folder="profile"
      />

      <ListInput
        label="Badge (contoh: GPA 3.9/4.0, Cum Laude)"
        items={profile.badges || []}
        onChange={set("badges")}
      />

      <ListInput
        label="Paragraf About"
        items={profile.about_paragraphs || []}
        onChange={set("about_paragraphs")}
      />

      <ListInput
        label="Technical Skills"
        items={profile.technical_skills || []}
        onChange={set("technical_skills")}
      />

      <ListInput
        label="Interests"
        items={profile.interests || []}
        onChange={set("interests")}
      />

      <h2 className="text-xl font-bold text-white mt-8 mb-4">Contact</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-zinc-300 mb-1">Email</label>
          <input
            value={profile.contact_email}
            onChange={handleChange("contact_email")}
            className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-300 mb-1">LinkedIn</label>
          <input
            value={profile.contact_linkedin}
            onChange={handleChange("contact_linkedin")}
            className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-300 mb-1">GitHub</label>
          <input
            value={profile.contact_github}
            onChange={handleChange("contact_github")}
            className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-300 mb-1">
            Instagram
          </label>
          <input
            value={profile.contact_instagram}
            onChange={handleChange("contact_instagram")}
            className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold transition-colors"
        >
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
        {savedAt && (
          <span className="text-sm text-green-400">Tersimpan!</span>
        )}
      </div>
    </form>
  );
};

export default ProfileEditor;
