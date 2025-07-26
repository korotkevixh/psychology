import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: #f4f6fa;
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    color: #1a202c;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
  * {
    box-sizing: border-box;
  }
`;

const Header = styled.header`
  width: 100vw;
  min-width: 100vw;
  background: #2563eb;
  color: #fff;
  padding: 0 0 0 0;
  box-shadow: 0 2px 16px rgba(37,99,235,0.08);
  display: flex;
  align-items: center;
  height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;
const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-left: 32px;
`;
const Container = styled.div`
  min-height: 100vh;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const Content = styled.main`
  width: 100%;
  max-width: 420px;
  margin-top: 96px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(37,99,235,0.10);
  padding: 40px 32px 32px 32px;
  min-height: 400px;
`;

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <Header>
      <Logo>Психологическое тестирование</Logo>
    </Header>
    <Container>
      <Content>{children}</Content>
    </Container>
  </>
);

export default Layout;