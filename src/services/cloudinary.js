const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export async function uploadImagem(file) {
  if (!file || !file.type.startsWith("image/")) {
    throw new Error("Selecione um arquivo de imagem.");
  }
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary nao configurado.");
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: data },
  );
  const json = await response.json().catch(() => ({}));
  if (!response.ok || !json.secure_url) {
    throw new Error(json.error?.message || "Falha ao enviar imagem.");
  }
  return json.secure_url;
}
