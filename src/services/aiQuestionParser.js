export const MULTIPLE_CHOICE_RULES = `
- Cada alternativa deve ter texto próprio e completo.
- Não use apenas letras, números soltos, siglas de uma letra, ou rótulos como "A", "A)", "Alternativa A".
- A UI já exibirá as letras das alternativas; o texto retornado pela IA não deve repetir isso.
- Retorne somente JSON válido, sem markdown e sem texto extra.
`.trim();

function normalizarTexto(texto) {
  return String(texto ?? "").replace(/\s+/g, " ").trim();
}

function extrairJson(raw) {
  const match = normalizarTexto(raw).match(/\{[\s\S]*\}/);
  return match ? match[0] : null;
}

function pareceRotuloAlternativa(texto) {
  const normalizado = normalizarTexto(texto);
  if (!normalizado) return true;

  const semPrefixo = normalizado.replace(
    /^(?:\(?\s*[A-D]\s*\)?[\)\].:-]?\s*|(?:op(?:ç|c)ão|alternativa)\s*[A-D][\)\].:-]?\s*)/i,
    ""
  ).trim();

  if (!semPrefixo) return true;
  if (/^[A-D]$/i.test(normalizado)) return true;
  if (/^[A-D]\s*[\)\].:-]?\s*[A-D]$/i.test(normalizado)) return true;

  return false;
}

export function normalizarAlternativas(alternativas, total = 4) {
  if (!Array.isArray(alternativas) || alternativas.length !== total) {
    return null;
  }

  const normalizadas = alternativas.map((alternativa) => normalizarTexto(alternativa));

  if (normalizadas.some((alternativa) => pareceRotuloAlternativa(alternativa))) {
    return null;
  }

  const unicas = new Set(normalizadas.map((alternativa) => alternativa.toLowerCase()));
  if (unicas.size !== normalizadas.length) {
    return null;
  }

  return normalizadas;
}

export function parsePerguntaMultiplaEscolha(raw) {
  try {
    const json = extrairJson(raw);
    if (!json) return null;

    const parsed = JSON.parse(json);
    const alternativas = normalizarAlternativas(parsed.alternativas, 4);

    if (
      !parsed.pergunta ||
      !alternativas ||
      !Number.isInteger(parsed.correta) ||
      parsed.correta < 0 ||
      parsed.correta > 3
    ) {
      return null;
    }

    return {
      pergunta: normalizarTexto(parsed.pergunta),
      alternativas,
      correta: parsed.correta,
    };
  } catch {
    return null;
  }
}

export function parseQuizMultiplaEscolha(raw, totalPerguntas = 5) {
  try {
    const json = extrairJson(raw);
    if (!json) return null;

    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed.perguntas) || parsed.perguntas.length !== totalPerguntas) {
      return null;
    }

    const perguntas = parsed.perguntas.map((pergunta) => {
      const alternativas = normalizarAlternativas(pergunta.alternativas, 4);

      if (
        !pergunta.pergunta ||
        !alternativas ||
        !Number.isInteger(pergunta.correta) ||
        pergunta.correta < 0 ||
        pergunta.correta > 3
      ) {
        return null;
      }

      return {
        pergunta: normalizarTexto(pergunta.pergunta),
        alternativas,
        correta: pergunta.correta,
      };
    });

    if (perguntas.some((pergunta) => !pergunta)) {
      return null;
    }

    return {
      materia: normalizarTexto(parsed.materia) || "Geral",
      perguntas,
    };
  } catch {
    return null;
  }
}