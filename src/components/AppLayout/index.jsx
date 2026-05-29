import { FaGamepad, FaHome, FaLayerGroup, FaTrophy, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import { useDuelosPendentes } from "../../hooks/useDuelo";

const Shell = styled.div`
  min-height: 100vh;
  background: #160c22;
`;
const Sidebar = styled.nav`
  background: #231133;
  border-right: 1px solid #492363;
  display: flex;
  flex-direction: column;
  gap: 28px;
  inset: 0 auto 0 0;
  padding: 30px 18px;
  position: fixed;
  width: 220px;
  z-index: 2;

  @media (max-width: 720px) {
    border-right: 0;
    border-top: 1px solid #492363;
    bottom: 0;
    flex-direction: row;
    gap: 4px;
    height: 70px;
    justify-content: space-around;
    padding: 8px;
    top: auto;
    width: 100%;
  }
`;
const Logo = styled.div`
  color: #b84ef2;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-align: center;

  @media (max-width: 720px) {
    display: none;
  }
`;
const Links = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 720px) {
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
  }
`;
const Item = styled(NavLink)`
  align-items: center;
  border-radius: 12px;
  color: #a086cc;
  display: flex;
  gap: 12px;
  padding: 13px 12px;
  position: relative;

  &.active, &:hover {
    background: #3a1f54;
    color: #fff;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    font-size: 0.72rem;
    gap: 5px;
    padding: 7px;
  }
`;
const Count = styled.span`
  background: #b84ef2;
  border-radius: 10px;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  position: absolute;
  right: 6px;
  top: 5px;
`;
const Content = styled.main`
  margin-left: 220px;
  min-height: 100vh;

  @media (max-width: 720px) {
    margin-left: 0;
    padding-bottom: 70px;
  }
`;

export default function AppLayout() {
  const { total } = useDuelosPendentes();
  return (
    <Shell>
      <Sidebar>
        <Logo>OSG</Logo>
        <Links>
          <Item to="/menu"><FaHome /><span>Início</span></Item>
          <Item to="/grupos"><FaLayerGroup /><span>Grupos</span></Item>
          <Item to="/game"><FaGamepad /><span>Jogar</span>{total > 0 && <Count>{total}</Count>}</Item>
          <Item to="/ranking"><FaTrophy /><span>Ranking</span></Item>
          <Item to="/perfil"><FaUser /><span>Perfil</span></Item>
        
        </Links>
      </Sidebar>
      <Content>
        <Outlet />
      </Content>
    </Shell>
  );
}
