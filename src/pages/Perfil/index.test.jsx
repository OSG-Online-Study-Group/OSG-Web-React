import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    usuario: {
      uid: "user-1",
      name: "Ana Teste",
      xp: 720,
      level: 4,
      photo: null,
      theme: null,
      groupIds: ["group_matematica", "group_linguagens"],
    },
    logout: vi.fn(),
  }),
}));

import Perfil from ".";

describe("Perfil", () => {
  it("renderiza dados do perfil e barra de progresso", () => {
    render(
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Seu perfil" })).toBeInTheDocument();
    expect(screen.getByText("Ana Teste")).toBeInTheDocument();
    expect(screen.getByText("Nível 4 - Avançado")).toBeInTheDocument();
    expect(screen.getByText("720 XP")).toBeInTheDocument();
    expect(screen.getByText("280 XP para o nível 5")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Grupos")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Editar perfil" })).toHaveAttribute("href", "/editar-perfil");
  });
});
