import { supabase } from "./supabaseClient";

const BUCKET = "portfolio-assets";

export async function uploadImage(file, folder) {
  const ext = file.name.split(".").pop();
  const path = `${folder}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file);
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function fetchProfile() {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", 1)
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(fields) {
  const { data, error } = await supabase
    .from("profile")
    .update(fields)
    .eq("id", 1)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function fetchExperiences() {
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) throw error;
  return data;
}

export async function createExperience(fields) {
  const { data, error } = await supabase
    .from("experiences")
    .insert(fields)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateExperience(id, fields) {
  const { error } = await supabase
    .from("experiences")
    .update(fields)
    .eq("id", id);
  if (error) throw error;
}

export async function deleteExperience(id) {
  const { error } = await supabase.from("experiences").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) throw error;
  return data;
}

export async function createProject(fields) {
  const { data, error } = await supabase
    .from("projects")
    .insert(fields)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProject(id, fields) {
  const { error } = await supabase.from("projects").update(fields).eq("id", id);
  if (error) throw error;
}

export async function deleteProject(id) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchCertificates() {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) throw error;
  return data;
}

export async function createCertificate(fields) {
  const { data, error } = await supabase
    .from("certificates")
    .insert(fields)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateCertificate(id, fields) {
  const { error } = await supabase
    .from("certificates")
    .update(fields)
    .eq("id", id);
  if (error) throw error;
}

export async function deleteCertificate(id) {
  const { error } = await supabase.from("certificates").delete().eq("id", id);
  if (error) throw error;
}

// Persists a full new ordering (array of ids, already in the desired order)
// after a drag-and-drop reorder.
export async function reorderItems(table, orderedIds) {
  const updates = orderedIds.map((id, index) =>
    supabase.from(table).update({ order_index: index }).eq("id", id)
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed) throw failed.error;
}
