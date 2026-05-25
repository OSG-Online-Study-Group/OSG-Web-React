export async function uploadImagem(uri) {
  const data = new FormData();

  data.append("file", {
    uri,
    type: "image/jpeg",
    name: "profile.jpg",
  });

  data.append("upload_preset", "foto_perfil");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dtmiwy78p/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const json = await res.json();
  return json.secure_url;
}