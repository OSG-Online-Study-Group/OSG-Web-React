import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getProgressInfo } from "../../utils/levelProgress";
import LevelProgress from ".";

describe("getProgressInfo", () => {
  it("calcula progresso inicial sem XP", () => {
    expect(getProgressInfo(0, 1)).toEqual({
      progress: 0,
      currentXP: 0,
      level: 1,
      requiredXP: 100,
      remainingXP: 100,
      nextLevel: 2,
      totalXP: 0,
    });
  });

  it("calcula XP dentro do nível atual", () => {
    expect(getProgressInfo(720, 4)).toMatchObject({
      progress: 30,
      currentXP: 120,
      requiredXP: 400,
      remainingXP: 280,
      nextLevel: 5,
      totalXP: 720,
    });
  });

  it("corrige o nível quando o XP está à frente do campo salvo", () => {
    expect(getProgressInfo(1000, 2)).toMatchObject({
      level: 5,
      progress: 0,
      nextLevel: 6,
    });
  });

  it("trata XP inválido e nível máximo", () => {
    expect(getProgressInfo(-20, 1)).toMatchObject({
      progress: 0,
      totalXP: 0,
    });

    expect(getProgressInfo(2600, 7)).toMatchObject({
      progress: 100,
      requiredXP: null,
      remainingXP: 0,
      nextLevel: null,
      totalXP: 2600,
    });
  });
});

describe("LevelProgress", () => {
  it("renderiza nível, XP total, XP restante e porcentagem", () => {
    render(<LevelProgress xp={720} level={4} />);

    expect(screen.getByText("Nível 4 - Avançado")).toBeInTheDocument();
    expect(screen.getByText("720 XP")).toBeInTheDocument();
    expect(screen.getByText("280 XP para o nível 5")).toBeInTheDocument();
    expect(screen.getByText("120 / 400 XP neste nível")).toBeInTheDocument();
    expect(screen.getByText("30%")).toBeInTheDocument();
  });

  it("informa quando o nível máximo foi alcançado", () => {
    render(<LevelProgress xp={2600} level={7} />);

    expect(screen.getByText("Nível 7 - Lendário")).toBeInTheDocument();
    expect(screen.getByText("Nível máximo alcançado")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });
});
