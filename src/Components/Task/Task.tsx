import { forwardRef, useState } from "react";
import { ColumnTask } from "../../types";
import styled from "styled-components";
import { Draggable } from "@hello-pangea/dnd";
import { userColors, Assignee } from "../../constants";
import moment from "moment";
import { isInThePast } from "../../utils/helpers";

const Card = styled.div<{ $isCompact: boolean; $backgroundColor: string }>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  height: ${(props) => (props.$isCompact ? "40px" : "auto")};
  min-height: 60px;
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
  height: 30px;
`;

const Content = styled.div<{ $isCompact: boolean }>`
  display: ${(props) => (props.$isCompact ? "none" : "block")};
  padding: 0 12px;
  margin: 6px 0;
`;
const Title = styled.div`
  font-size: calc(6px + 2vmin);
  color: #000000;
`;

const AssigneeWrapper = styled.div`
  font-size: calc(6px + 1vmin);
  color: #000000;
`;

const Description = styled.div`
  color: #000000;
`;

const CompleteBy = styled.div`
  padding-top: 6px;
  text-align: end;
  color: gray;
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
            {task.completeBy && (
              <CompleteBy>
                {isInThePast(task.completeBy) ? "Was due " : "Due "}
                {moment().to(moment(task.completeBy))}
              </CompleteBy>
            )}
          </Content>
        </Card>
      )}
    </Draggable>
  );
}

export default styled(forwardRef(Task))``;
