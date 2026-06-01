import styled from "styled-components";

import { getTituloLevel } from "../../services/firestore";

const LEVEL_XP = {
  1: 0,
  2: 100,
  3: 300,
  4: 600,
  5: 1000,
  6: 1500,
  7: 2500,
};

const Card = styled.div`
  width: 100%;
  max-width: ${({ $compact }) => ($compact ? "520px" : "100%")};
  border-radius: 22px;
  padding: ${({ $compact }) => ($compact ? "16px" : "18px 20px")};
  background:
    linear-gradient(rgba(38, 13, 60, 0.88), rgba(38, 13, 60, 0.88)),
    linear-gradient(135deg, #00e1ff, #d54dff);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border: 1px solid transparent;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;

  @media (max-width: 560px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    color: white;
    font-size: 16px;
  }

  span {
    color: #d8c8f5;
    font-size: 13px;
  }
`;

const TotalXP = styled.span`
  color: white;
  font-size: 14px;
  font-weight: 800;
  white-space: nowrap;
`;

const Track = styled.div`
  width: 100%;
  height: 12px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.12);
`;

const Fill = styled.div`
  width: ${({ $progress }) => `${$progress}%`};
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #00e1ff, #d54dff);
  box-shadow: 0 0 18px rgba(213, 77, 255, 0.5);
  transition: width 0.3s ease;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
  color: #d8c8f5;
  font-size: 13px;
  font-weight: 600;

  @media (max-width: 560px) {
    flex-direction: column;
    gap: 4px;
  }
`;

function getProgressInfo(xp, level) {
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

export default function LevelProgress({ xp = 0, level = 1, compact = false }) {
  const {
    progress,
    currentXP,
    requiredXP,
    remainingXP,
    level: currentLevel,
    nextLevel,
    totalXP,
  } = getProgressInfo(xp, level);

  return (
    <Card $compact={compact}>
      <Header>
        <Title>
          <strong>
            Nível {currentLevel} - {getTituloLevel(currentLevel)}
          </strong>

          <span>
            {nextLevel
              ? `${remainingXP} XP para o nível ${nextLevel}`
              : "Nível máximo alcançado"}
          </span>
        </Title>

        <TotalXP>
          {totalXP} XP
        </TotalXP>
      </Header>

      <Track>
        <Fill $progress={progress} />
      </Track>

      <Footer>
        <span>
          {requiredXP
            ? `${currentXP} / ${requiredXP} XP neste nível`
            : `${currentXP} XP total`}
        </span>

        <span>
          {progress}%
        </span>
      </Footer>
    </Card>
  );
}
