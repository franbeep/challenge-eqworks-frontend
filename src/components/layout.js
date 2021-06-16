import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.02);
  @media (min-width: 1024px) {
    width: 1024px;
  }
`;

const Side = styled.div`
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  min-height: 100%;
  background-color: white;
  flex-grow: 1;
  z-index: 10;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Main = styled.main`
  display: flex;
  min-height: 100vh;
  flex-direction: row;
`;

function Layout({ children }) {
  return (
    <Main>
      <Side />
      <Content>{children}</Content>
      <Side />
    </Main>
  );
}

export default Layout;
