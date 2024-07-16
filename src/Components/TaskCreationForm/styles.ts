import styled from "styled-components";

export const Container = styled.div<{ $isExpended: boolean }>`
  position: absolute;
  z-index: 2;
  top: 20%;
  left: 0;
  align-items: center;
  /* height: 20vh; */
  max-width: ${(props) =>
    props.$isExpended ? `calc(20vw + 12px)` : `calc(10vw + 12px)`};
  margin: 20px auto 10px auto;
  /* border: 1px solid #cccccc; */
  background-color: var(--primary-color-light);
  box-shadow: 0 0 12px 0 var(--primary-color-dark);
  opacity: 0.85;
  padding: 12px;
  text-align: left;
  border-radius: 0 12px 12px 0;
  &:hover {
    cursor: ${(props) => (props.$isExpended ? "default" : "pointer")};
  }
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(7, 1fr [col-start]);
  grid-gap: 12px;
  padding: 12px;
  align-items: flex-start;
  & > * > input {
    padding: 12px;
  }
`;
export const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: calc(6px + 2vmin);
  color: var(--primary-color-dark);
`;

export const SubmitWrapper = styled.div`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row: 7;
  padding: 0 30%;
`;

export const Submit = styled.input`
  display: inline-block;
  outline: 0;
  border: none;
  cursor: pointer;
  font-weight: 600;
  border-radius: 4px;
  font-size: 13px;
  background-color: var(--secondary-color);
  color: white;
  &:hover {
    background-color: var(--secondary-color-dark);
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  font-weight: 400;
  &:hover {
    font-weight: 800;
    transform: scale(1.2);
  }
`;
