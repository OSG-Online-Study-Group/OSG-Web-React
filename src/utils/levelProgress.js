const LEVEL_XP = {
  1: 0,
  2: 100,
  3: 300,
  4: 600,
  5: 1000,
  6: 1500,
  7: 2500,
};

export function getProgressInfo(xp, level) {
  const safeXP = Math.max(Number(xp) || 0, 0);
  const levelFromXP = Object.entries(LEVEL_XP).reduce(
    (current, [itemLevel, itemXP]) =>
      safeXP >= itemXP ? Number(itemLevel) : current,
    1,
  );
  const safeLevel = Math.min(
    Math.max(Number(level) || levelFromXP, levelFromXP, 1),
    7,
  );
  const currentLevelXP = LEVEL_XP[safeLevel] || 0;
  const nextLevel = safeLevel + 1;
  const nextLevelXP = LEVEL_XP[nextLevel];

  if (!nextLevelXP) {
    return {
      progress: 100,
      currentXP: safeXP,
      requiredXP: null,
      remainingXP: 0,
      level: safeLevel,
      nextLevel: null,
      totalXP: safeXP,
    };
  }

  const requiredXP = nextLevelXP - currentLevelXP;
  const currentXP = Math.min(Math.max(safeXP - currentLevelXP, 0), requiredXP);
  const remainingXP = Math.max(nextLevelXP - safeXP, 0);

  return {
    progress: Math.round((currentXP / requiredXP) * 100),
    currentXP,
    level: safeLevel,
    requiredXP,
    remainingXP,
    nextLevel,
    totalXP: safeXP,
  };
}
