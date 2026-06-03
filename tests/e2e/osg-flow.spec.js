import { expect, test } from "@playwright/test";

async function saveScreenshot(page, testInfo, name) {
  await page.waitForTimeout(700);

  await page.screenshot({
    fullPage: true,
    path: `test-results/screenshots/${testInfo.project.name}-${name}.png`,
  });
}

test("fluxo autenticado renderiza menu e navega para perfil", async ({ page }, testInfo) => {
  await page.goto("menu");

  await expect(page.getByText("Olá, Ana Teste")).toBeVisible();
  await expect(page.getByText("720 XP • Nível 4")).toBeVisible();
  await expect(page.getByText("280 XP para o nível 5")).toBeVisible();
  await expect(page.getByText("MATEMATICA")).toBeVisible();

  await saveScreenshot(page, testInfo, "menu");

  await page.getByRole("link", { name: /perfil/i }).click();

  await expect(page.getByRole("heading", { name: "Seu perfil" })).toBeVisible();
  await expect(page.getByText("Nível 4 - Avançado")).toBeVisible();
  await expect(page.getByRole("main").getByText("Grupos")).toBeVisible();

  await saveScreenshot(page, testInfo, "perfil");
});

test("fluxo do quiz diário conclui perguntas e exibe XP", async ({ page }, testInfo) => {
  await page.goto("quiz-diario");

  await expect(page.getByText("Quiz Diário")).toBeVisible();
  await expect(page.getByText("Quanto é 2 + 2?")).toBeVisible();

  await page.getByRole("button", { name: /B 4/i }).click();
  await expect(page.getByText("Quanto é 5 x 3?")).toBeVisible();

  await page.getByRole("button", { name: /C 15/i }).click();
  await expect(page.getByText("Qual número é par?")).toBeVisible();

  await page.getByRole("button", { name: /D 12/i }).click();
  await expect(page.getByText("Quanto é 9 - 4?")).toBeVisible();

  await page.getByRole("button", { name: /C 5/i }).click();
  await expect(page.getByText("Quanto é 10 / 2?")).toBeVisible();

  await page.getByRole("button", { name: /C 5/i }).click();

  await expect(page.getByText("Quiz concluído")).toBeVisible();
  await expect(page.getByText("5 de 5")).toBeVisible();
  await expect(page.getByText("+20 XP conquistado")).toBeVisible();

  await saveScreenshot(page, testInfo, "quiz-concluido");
});
