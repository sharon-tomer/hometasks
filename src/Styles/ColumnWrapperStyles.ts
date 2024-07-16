import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 1fr 1fr;
  grid-gap: 12px;
  padding: 12px;
  /* width: 90vw; */
  margin: 0 auto;
  min-height: 50vh;
`;

const ColumnWrapper = styled.div<{
  $column: number;
  $row: number;
  $size: number;
}>`
  grid-column: ${(props) => props.$column};
  grid-row-start: ${(props) => props.$row};
  grid-row-end: ${(props) => props.$row + props.$size};
`;

export { Container, ColumnWrapper };
