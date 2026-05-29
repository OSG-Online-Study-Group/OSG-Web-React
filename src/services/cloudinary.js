const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim();
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET?.trim();

function isPlaceholder(value) {
  return Boolean(value && value.startsWith("your_"));
}

export async function uploadImagem(file) {
  if (!file || !file.type.startsWith("image/")) {
    throw new Error("Selecione um arquivo de imagem.");
  }
  if (!CLOUD_NAME || !UPLOAD_PRESET || isPlaceholder(CLOUD_NAME) || isPlaceholder(UPLOAD_PRESET)) {
    throw new Error(
      "Configure VITE_CLOUDINARY_CLOUD_NAME e VITE_CLOUDINARY_UPLOAD_PRESET com um preset unsigned valido.",
    );
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: data },
  );
  const json = await response.json().catch(() => ({}));
  const errorMessage = json.error?.message || "Falha ao enviar imagem.";

  if (!response.ok || !json.secure_url) {
    if (/upload preset not found/i.test(errorMessage) || /preset not found/i.test(errorMessage)) {
      throw new Error(
        "Cloudinary nao encontrou o upload preset. Verifique se VITE_CLOUDINARY_UPLOAD_PRESET aponta para um preset unsigned existente.",
      );
    }
    throw new Error(json.error?.message || "Falha ao enviar imagem.");
  }
  return json.secure_url;
}
