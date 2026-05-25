const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

const OPENROUTER_MODELS = [
  "nvidia/nemotron-3-nano-30b-a3b:free",
  "google/gemma-3-4b-it:free",
  "openai/gpt-oss-20b:free",
];

function extrairConteudoResposta(data) {
  if (!data || !Array.isArray(data.choices) || data.choices.length === 0) {
    return "";
  }

  const firstChoice = data.choices[0] || {};
  const content = firstChoice?.message?.content || firstChoice?.text || "";

  if (Array.isArray(content)) {
    return content
      .map((item) => (typeof item === "string" ? item : item?.text || ""))
      .join("\n")
      .trim();
  }

  return String(content).trim();
}

export async function enviarMensagemParaIA(mensagem) {
  if (!OPENROUTER_API_KEY) {
    return "Erro: chave OpenRouter ausente. Verifique VITE_OPENROUTER_API_KEY no .env.";
  }

  let ultimoErro = "";

  try {
    for (const model of OPENROUTER_MODELS) {
      const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: mensagem }],
        }),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        const apiError = data?.error?.message || `HTTP ${response.status}`;
        ultimoErro = `${model}: ${apiError}`;
        continue;
      }

      const texto = extrairConteudoResposta(data);
      if (texto) {
        return texto;
      }

      ultimoErro = `${model}: resposta sem conteudo`;
    }

    return `Erro: IA indisponivel no momento. ${ultimoErro}`;

  } catch (error) {
    console.error("Erro ao chamar OpenRouter:", error);
    return "Erro ao conectar com a IA.";
  }
}