import { describe, expect, it, vi } from "vitest";

vi.mock("./firebase", () => ({
  db: {},
}));

import { calcularLevel, getTituloLevel } from "./firestore";

describe("regras de nivelamento", () => {
  it("calcula o nível a partir dos marcos de XP", () => {
    expect(calcularLevel(0)).toBe(1);
    expect(calcularLevel(99)).toBe(1);
    expect(calcularLevel(100)).toBe(2);
    expect(calcularLevel(300)).toBe(3);
    expect(calcularLevel(600)).toBe(4);
    expect(calcularLevel(1000)).toBe(5);
    expect(calcularLevel(1500)).toBe(6);
    expect(calcularLevel(2500)).toBe(7);
  });

  it("retorna títulos consistentes para os níveis exibidos na UI", () => {
    expect(getTituloLevel(1)).toBe("Iniciante");
    expect(getTituloLevel(4)).toBe("Avançado");
    expect(getTituloLevel(7)).toBe("Lendário");
    expect(getTituloLevel(999)).toBe("Iniciante");
  });
});
