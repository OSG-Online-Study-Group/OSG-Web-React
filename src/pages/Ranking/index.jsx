import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useRankingGeral, useRankingTodosGrupos } from "../../hooks/useRanking";
import {
  Button,
  Card,
  Message,
  Muted,
  Page,
  SecondaryButton,
  Title,
} from "../../styles/ui";

/* ───────────────────────────────────────────── */
/* ICONS DOS GRUPOS */
/* ───────────────────────────────────────────── */

const GROUP_ICONS = {
  Matemática: "🧠",
  "Ciências Humanas": "📚",
  Linguagens: "🗣️",
  "Ciências da Natureza": "🔬",
  Informática: "💻",
};

import defaultAvatar from "../../assets/image/profile_photo.jpg";

/* ───────────────────────────────────────────── */
/* Animations */
/* ───────────────────────────────────────────── */

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* ───────────────────────────────────────────── */
/* Layout */
/* ───────────────────────────────────────────── */

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const HeaderCard = styled(Card)`
  background: linear-gradient(
    135deg,
    #4a1090 0%,
    #8f1fe4 50%,
    #d63acd 100%
  );

  border-radius: 28px;
  padding: 32px 28px;
  text-align: center;
  position: relative;
  overflow: hidden;

  box-shadow: 0 10px 32px rgba(180, 40, 220, 0.35);

  &::before {
    content: "";
    position: absolute;
    inset: 0;

    background: radial-gradient(
      circle at 70% 20%,
      rgba(255, 255, 255, 0.15),
      transparent 60%
    );

    pointer-events: none;
  }

  h2 {
    position: relative;
    z-index: 2;
    font-size: clamp(28px, 5vw, 42px);
    margin-bottom: 10px;
  }

  p {
    position: relative;
    z-index: 2;
    opacity: 0.85;
    font-size: 15px;
  }
`;

const Toggle = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
`;

const RankingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

/* ───────────────────────────────────────────── */
/* TOP 3 */
/* ───────────────────────────────────────────── */

const Podium = styled(Card)`
  background: linear-gradient(145deg, #351253, #26093f);
  border-radius: 28px;
  padding: 32px 24px;
  overflow: hidden;
`;

const PodiumTitle = styled.div`
  text-align: center;
  margin-bottom: 28px;

  h3 {
    font-size: 24px;
    margin-bottom: 8px;
  }

  p {
    color: #c8b4f0;
    font-size: 14px;
  }
`;

const Top3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 22px;
  flex-wrap: wrap;
`;

const TopUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  animation: ${fadeUp} 0.45s ease both;

  ${({ $first }) =>
    $first &&
    `
      transform: translateY(-12px);
    `}
`;

const Crown = styled.div`
  font-size: 28px;
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.7));
`;

const AvatarWrapper = styled.div`
  position: relative;
`;

const Avatar = styled.img`
  width: ${({ $first }) => ($first ? "110px" : "82px")};
  height: ${({ $first }) => ($first ? "110px" : "82px")};

  border-radius: 50%;
  object-fit: cover;

  border: ${({ $first }) =>
    $first
      ? "4px solid #ffd700"
      : "3px solid rgba(255,255,255,0.3)"};

  box-shadow: ${({ $first }) =>
    $first
      ? "0 0 26px rgba(255,215,0,0.45)"
      : "0 0 18px rgba(255,255,255,0.12)"};
`;

const GroupIconLarge = styled.div`
  width: ${({ $first }) => ($first ? "110px" : "82px")};
  height: ${({ $first }) => ($first ? "110px" : "82px")};

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: ${({ $first }) => ($first ? "48px" : "38px")};

  background: linear-gradient(135deg, #7b22d4, #d63acd);

  border: ${({ $first }) =>
    $first
      ? "4px solid #ffd700"
      : "3px solid rgba(255,255,255,0.3)"};

  box-shadow: ${({ $first }) =>
    $first
      ? "0 0 26px rgba(255,215,0,0.45)"
      : "0 0 18px rgba(255,255,255,0.12)"};
`;

const Position = styled.div`
  position: absolute;
  bottom: -4px;
  right: -4px;

  background: #1e082f;

  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;

  padding: 4px 8px;

  font-size: 11px;
  font-weight: 700;
`;

const TopName = styled.strong`
  font-size: 15px;
`;

const TopXP = styled.span`
  opacity: 0.75;
  font-size: 13px;
`;

/* ───────────────────────────────────────────── */
/* LIST */
/* ───────────────────────────────────────────── */

const RankingList = styled(Card)`
  padding: 14px;

  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  background: linear-gradient(
    90deg,
    #7b22d4 0%,
    #d63acd 100%
  );

  border-radius: 22px;

  padding: 14px 18px;

  animation: ${slideIn} 0.4s ease both;

  transition:
    transform 0.2s,
    filter 0.2s;

  &:hover {
    transform: translateX(4px);
    filter: brightness(1.08);
  }
`;

const PositionBadge = styled.div`
  min-width: 38px;
  font-size: 14px;
  font-weight: 700;
  opacity: 0.7;
`;

const MiniAvatar = styled.img`
  width: 52px;
  height: 52px;

  border-radius: 50%;
  object-fit: cover;

  border: 2px solid rgba(255, 255, 255, 0.25);
`;

const GroupIconSmall = styled.div`
  width: 52px;
  height: 52px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;

  background: rgba(255, 255, 255, 0.14);

  border: 2px solid rgba(255, 255, 255, 0.25);
`;

const UserInfo = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  strong {
    font-size: 15px;
  }

  span {
    font-size: 12px;
    opacity: 0.75;
  }
`;

const XP = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

/* ───────────────────────────────────────────── */
/* Component */
/* ───────────────────────────────────────────── */

const getAvatar = (photo) => {
  if (
    !photo ||
    photo === "null" ||
    photo === "undefined"
  ) {
    return defaultAvatar;
  }

  return photo;
};



export default function Ranking() {
  const [groupsMode, setGroupsMode] = useState(false);

  const general = useRankingGeral();
  const groups = useRankingTodosGrupos();

  const data = groupsMode
    ? groups.grupos
    : general.usuarios;

  const loading = groupsMode
    ? groups.carregando
    : general.carregando;

  const podium = data?.slice(0, 3) || [];
  const rest = data?.slice(3) || [];

  function getGroupIcon(name) {
    return GROUP_ICONS[name] || "📘";
  }

  return (
    <Page>
      <Wrapper>

        <HeaderCard>
          <h2>
            {groupsMode
              ? "Ranking de Grupos"
              : "Ranking de Usuários"}
          </h2>

          <p>
            Atualização em tempo real pelo Firestore
          </p>
        </HeaderCard>

        <Toggle>
          {groupsMode ? (
            <SecondaryButton
              onClick={() => setGroupsMode(false)}
            >
              Pessoas
            </SecondaryButton>
          ) : (
            <Button>Pessoas</Button>
          )}

          {groupsMode ? (
            <Button>Grupos</Button>
          ) : (
            <SecondaryButton
              onClick={() => setGroupsMode(true)}
            >
              Grupos
            </SecondaryButton>
          )}
        </Toggle>

        {general.erro && (
          <Message $error>
            {general.erro}
          </Message>
        )}

        {loading ? (
          <Card>
            <Muted>
              Carregando ranking...
            </Muted>
          </Card>
        ) : (
          <RankingContainer>

            {/* TOP 3 */}

            <Podium>
              <PodiumTitle>
                <h3>Top 3</h3>

                <p>
                  {groupsMode
                    ? "Grupos com mais XP"
                    : "Usuários com maior pontuação"}
                </p>
              </PodiumTitle>

              <Top3>
                {podium.map((item, index) => {
                  const pos = index + 1;

                  return (
                    <TopUser
                      key={item.uid || item.id}
                      $first={pos === 1}
                      style={{
                        order:
                          pos === 1
                            ? 2
                            : pos === 2
                              ? 1
                              : 3,
                      }}
                    >
                      {pos === 1 && (
                        <Crown>👑</Crown>
                      )}

                      <AvatarWrapper>

                        {groupsMode ? (
                          <GroupIconLarge
                            $first={pos === 1}
                          >
                            {getGroupIcon(item.name)}
                          </GroupIconLarge>
                        ) : (
                          <Avatar
                            src={getAvatar(item.photo)}
                            alt={item.name}
                            $first={pos === 1}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = defaultAvatar;
                            }}
                          />
                        )}

                        <Position>
                          #{pos}
                        </Position>

                      </AvatarWrapper>

                      <TopName>
                        {item.name}
                      </TopName>

                      <TopXP>
                        {groupsMode
                          ? item.totalXP
                          : item.xp || 0}{" "}
                        XP
                      </TopXP>
                    </TopUser>
                  );
                })}
              </Top3>
            </Podium>

            {/* LISTA */}

            <RankingList>
              {rest.map((item, index) => (
                <Row
                  key={item.uid || item.id}
                  style={{
                    animationDelay: `${index * 0.06}s`,
                  }}
                >
                  <PositionBadge>
                    #{index + 4}
                  </PositionBadge>

                  {groupsMode ? (
                    <GroupIconSmall>
                      {getGroupIcon(item.name)}
                    </GroupIconSmall>
                  ) : (
                    <MiniAvatar
                      src={getAvatar(item.photo)}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = defaultAvatar;
                      }}
                    />
                  )}

                  <UserInfo>
                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      {groupsMode
                        ? "Grupo"
                        : "Usuário"}
                    </span>
                  </UserInfo>

                  <XP>
                    {groupsMode
                      ? item.totalXP
                      : item.xp || 0}{" "}
                    XP
                  </XP>
                </Row>
              ))}
            </RankingList>

          </RankingContainer>
        )}
      </Wrapper>
    </Page>
  );
}