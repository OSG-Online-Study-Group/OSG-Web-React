import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signInWithEmailAndPassword } from "firebase/auth";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
}));

vi.mock("../../services/firebase", () => ({
  auth: {},
}));

import Login from ".";

describe("Login", () => {
  it("exibe mensagem quando a autenticação falha", async () => {
    const user = userEvent.setup();
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error("invalid credentials"));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    await user.type(screen.getByPlaceholderText("E-mail"), "ana@osg.dev");
    await user.type(screen.getByPlaceholderText("Senha"), "senha-incorreta");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(screen.getByText("E-mail ou senha inválidos.")).toBeInTheDocument();
    });
  });
});
