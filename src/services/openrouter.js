const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODELS = [
  "nvidia/nemotron-3-nano-30b-a3b:free",
  "google/gemma-3-4b-it:free",
  "openai/gpt-oss-20b:free",
];

function getContent(data) {
  const content = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || "";
  if (Array.isArray(content)) {
    return content
      .map((item) => (typeof item === "string" ? item : item?.text || ""))
      .join("\n")
      .trim();
  }
  return String(content).trim();
}

export async function enviarMensagemParaIA(prompt) {
  if (!API_KEY) {
    throw new Error("Chave OpenRouter ausente. Configure VITE_OPENROUTER_API_KEY.");
  }

  let lastError = "IA indisponivel.";
  for (const model of MODELS) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        lastError = data?.error?.message || `Erro HTTP ${response.status}`;
        continue;
      }
      const content = getContent(data);
      if (content) return content;
    } catch (error) {
      lastError = error.message;
    }
  }

  throw new Error(lastError);
}
