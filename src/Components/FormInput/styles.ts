import styled from "styled-components";

export const Label = styled.label<{ $lineNumber: number; $hasError: boolean }>`
  font-size: calc(6px + 1vmin);
  font-weight: 500;
  grid-column: 1;
  grid-row: ${(props) => props.$lineNumber};
  &::first-letter {
    text-transform: capitalize;
  }
`;

export const Input = styled.input<{ $lineNumber: number; $hasError: boolean }>`
  grid-column: 2;
  grid-row: ${(props) => props.$lineNumber};
  padding: 3px 6px;
  border-width: ${(props) => (props.$hasError ? "thin" : "0px")};
  border-color: ${(props) => (props.$hasError ? "red" : "black")};
`;

export const TextArea = styled.textarea<{
  $lineNumber: number;
  $hasError: boolean;
}>`
  grid-column: 2;
  grid-row: ${(props) => props.$lineNumber};
  padding: 3px 6px;
  border-width: ${(props) => (props.$hasError ? "thin" : "0px")};
  border-color: ${(props) => (props.$hasError ? "red" : "black")};
  resize: none;
`;

export const Select = styled.select<{
  $lineNumber: number;
  $hasError: boolean;
}>`
  grid-column: 2;
  grid-row: ${(props) => props.$lineNumber};
  justify-self: left;
  padding: 0 6px;
  border-width: ${(props) => (props.$hasError ? "thin" : "0px")};
  border-color: ${(props) => (props.$hasError ? "red" : "black")};
`;

export const Checkbox = styled.input<{
  $lineNumber: number;
  $hasError: boolean;
}>`
  grid-column: 2;
  grid-row: ${(props) => props.$lineNumber};
  justify-self: left;
  border-width: thin;
  border-color: var(--primary-color);
  height: 18px;
  width: 18px;
  &:checked {
    accent-color: var(--secondary-color);
  }
`;

export const DatePicker = styled.input<{
  $lineNumber: number;
  $hasError: boolean;
}>``;
