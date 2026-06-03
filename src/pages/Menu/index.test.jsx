import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../hooks/useMenuStats", () => ({
  useMenuStats: () => ({
    usuario: {
      uid: "user-1",
      name: "Ana Teste",
      xp: 720,
      level: 4,
      photo: null,
    },
    loading: false,
    vitorias: 3,
    melhorMateria: "MATEMATICA",
    posicao: 2,
  }),
}));

import Menu from ".";

describe("Menu", () => {
  it("renderiza estatísticas e progresso do usuário", () => {
    render(<Menu />);

    expect(screen.getByText("Olá, Ana Teste")).toBeInTheDocument();
    expect(screen.getByText("Ana Teste")).toBeInTheDocument();
    expect(screen.getByText("720 XP • Nível 4")).toBeInTheDocument();
    expect(screen.getByText("280 XP para o nível 5")).toBeInTheDocument();
    expect(screen.getByText("Vitórias")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("2º")).toBeInTheDocument();
    expect(screen.getByText("MATEMATICA")).toBeInTheDocument();
  });
});
