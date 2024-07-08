import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  grid-template-rows: 1fr 8fr 1fr;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
`;

const Background = styled.div`
  background-attachment: scroll;
  background-color: var(--background-color);
  min-height: 100vh;
  min-width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Title = styled.h1`
  grid-row: 1;
  grid-column: 1 / span 2;
  color: var(--primary-color-dark);
  text-align: center;
  margin: 12px;
  font-size: calc(12px + 3vmin);
  font-weight: 800;
  font-family: "Roboto", sans-serif;
`;

const CreateTaskWrapper = styled("div")`
  grid-column: 1;
  grid-row: 2;
`;

const ColumnsWrapper = styled("div")`
  grid-column: 2;
  grid-row: 2;
`;

export { Grid, Background, Title, CreateTaskWrapper, ColumnsWrapper };
