import { forwardRef, useState } from "react";
import { ColumnTask } from "../../types";
import styled from "styled-components";
import { Draggable } from "@hello-pangea/dnd";
import { userColors, Assignee } from "../../constants";
import moment from "moment";
import { isInThePast } from "../../utils/helpers";
import { ReactComponent as Bin } from "../../assets/bin.svg";

const Card = styled.div<{ $isCompact: boolean; $backgroundColor: string }>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  /* height: ${(props) => (props.$isCompact ? "40px" : "auto")};
  min-height: 60px; */
  border: 1px solid #cccccc;
  background-color: ${(props) => props.$backgroundColor};
  padding: 12px;
  margin: 6px;
  text-align: left;
  border: none;
  border-radius: 5px;
  &:hover {
    filter: ${(props) => (props.$isCompact ? "brightness(0.9)" : "none")};
  }
`;

const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
  padding: 0 12px;
`;

const Content = styled.div<{ $isCompact: boolean }>`
  display: ${(props) => (props.$isCompact ? "none" : "flex")};
  flex-flow: column nowrap;
  padding: 0 12px;
  margin: 6px 0;
`;

const Footer = styled.div<{ $isCompact: boolean }>`
  display: ${(props) => (props.$isCompact ? "none" : "flex")};
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-top: 12px;
  padding: 0 12px;
`;

const Title = styled.div`
  font-size: calc(6px + 2vmin);
  color: var(--text-color);
`;

const AssigneeWrapper = styled.div`
  font-size: calc(6px + 1vmin);
  color: var(--text-color);
`;

const Description = styled.div`
  color: var(--text-color);
`;

const CompleteBy = styled.div`
  padding-top: 6px;
  text-align: end;
  color: var(--text-light-color);
`;

const BinWrapper = styled.div`
  width: 18px;
  height: 18px;
`;

function Task(task: ColumnTask, ref: React.LegacyRef<HTMLDivElement>) {
  const [isCompact, setIsCompact] = useState(true);

  function toggleIsCompact() {
    setIsCompact(!isCompact);
  }

  return (
    <Draggable draggableId={`${task.id}`} index={task.index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          onClick={toggleIsCompact}
          $isCompact={isCompact}
          $backgroundColor={userColors[task.assignee || Assignee.either]}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Header>
            <Title className="title">{task.title}</Title>
            <AssigneeWrapper className="assignee">
              {task.assignee}
            </AssigneeWrapper>
          </Header>

          <Content $isCompact={isCompact}>
            <Description>{task.content}</Description>
          </Content>
          <Footer $isCompact={isCompact}>
            <BinWrapper>
              <Bin />
            </BinWrapper>
            {task.completeBy && (
              <CompleteBy>
                {isInThePast(task.completeBy) ? "Was due " : "Due "}
                {moment().to(moment(task.completeBy))}
              </CompleteBy>
            )}
          </Footer>
        </Card>
      )}
    </Draggable>
  );
}

export default styled(forwardRef(Task))``;
