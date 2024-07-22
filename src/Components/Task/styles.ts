import styled from "styled-components";

export const Card = styled.div<{
  $isCompact?: boolean;
  $backgroundColor?: string;
}>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  /* height: ${(props) => (props.$isCompact ? "40px" : "auto")};
  min-height: 60px; */
  border: 1px solid #cccccc;
  background-color: ${(props) => props.$backgroundColor || "white"};
  padding: 12px;
  margin: 6px;
  text-align: left;
  border: none;
  border-radius: 5px;
  &:hover {
    filter: ${(props) => (props.$isCompact ? "brightness(0.9)" : "none")};
    cursor: pointer;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
  padding: 0 12px;
`;

export const Content = styled.div<{ $isCompact?: boolean }>`
  display: ${(props) => (props.$isCompact ? "none" : "flex")};
  flex-flow: column nowrap;
  padding: 0 12px;
  margin: 6px 0;
`;

export const Footer = styled.div<{ $isCompact?: boolean }>`
  display: ${(props) => (props.$isCompact ? "none" : "flex")};
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-top: 12px;
  padding: 0 12px;
`;

export const Title = styled.div`
  font-size: calc(6px + 2vmin);
  color: var(--text-color);
`;

export const AssigneeWrapper = styled.div`
  font-size: calc(6px + 1vmin);
  color: var(--text-color);
`;

export const Description = styled.div`
  color: var(--text-color);
`;

export const CompleteBy = styled.div`
  padding-top: 6px;
  text-align: end;
  color: var(--text-light-color);
`;

export const BinWrapper = styled.div`
  width: 18px;
  height: 18px;
  &:hover {
  }
`;
