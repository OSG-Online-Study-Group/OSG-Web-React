import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

const perguntas = [
  { pergunta: "Quanto é 2 + 2?", alternativas: ["3", "4", "5", "6"], correta: 1 },
  { pergunta: "Quanto é 5 x 3?", alternativas: ["10", "12", "15", "20"], correta: 2 },
  { pergunta: "Qual número é par?", alternativas: ["7", "9", "11", "12"], correta: 3 },
  { pergunta: "Quanto é 9 - 4?", alternativas: ["3", "4", "5", "6"], correta: 2 },
  { pergunta: "Quanto é 10 / 2?", alternativas: ["2", "4", "5", "8"], correta: 2 },
];

vi.mock("../../hooks/useQuizDiario", () => ({
  useQuizDiario: () => {
    const [perguntaIndex, setPerguntaIndex] = useState(0);
    const [respostas, setRespostas] = useState([]);
    const [finalizado, setFinalizado] = useState(false);

    function responder(index) {
      const nextAnswers = [...respostas];
      nextAnswers[perguntaIndex] = index;
      setRespostas(nextAnswers);

      if (perguntaIndex < perguntas.length - 1) {
        setPerguntaIndex((current) => current + 1);
        return;
      }

      setFinalizado(true);
    }

    const acertos = respostas.filter(
      (answer, index) => answer === perguntas[index]?.correta,
    ).length;

    return {
      quiz: { materia: "Matemática", perguntas },
      perguntaAtual: perguntas[perguntaIndex],
      perguntaIndex,
      totalPerguntas: perguntas.length,
      respostas,
      carregando: false,
      jaJogouHoje: false,
      finalizado,
      xpGanho: Math.round((acertos / perguntas.length) * 20),
      acertos,
      responder,
    };
  },
}));

import QuizDiario from ".";

describe("QuizDiario", () => {
  it("simula respostas e exibe o resultado final", async () => {
    const user = userEvent.setup();

    render(<QuizDiario />);

    expect(screen.getByText("Quanto é 2 + 2?")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /B 4/i }));
    await user.click(screen.getByRole("button", { name: /C 15/i }));
    await user.click(screen.getByRole("button", { name: /D 12/i }));
    await user.click(screen.getByRole("button", { name: /C 5/i }));
    await user.click(screen.getByRole("button", { name: /C 5/i }));

    expect(screen.getByText("Quiz concluído")).toBeInTheDocument();
    expect(screen.getByText("5 de 5")).toBeInTheDocument();
    expect(screen.getByText("+20 XP conquistado")).toBeInTheDocument();
  });
});
