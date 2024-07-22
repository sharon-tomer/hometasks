import { useContext, useState } from "react";
import { ColumnTask } from "../../types";
import styled from "styled-components";
import { Draggable } from "@hello-pangea/dnd";
import { userColors, Assignee } from "../../constants";
import moment from "moment";
import { isInThePast } from "../../utils/helpers";
import { ReactComponent as Bin } from "../../assets/bin.svg";
import {
  Card,
  Header,
  Title,
  AssigneeWrapper,
  Content,
  Description,
  Footer,
  BinWrapper,
  CompleteBy,
} from "./styles";
import { AppDispatchContext } from "../../Contexts/AppContext";
import { actions } from "../../Actions/TaskActions";

const Task = (task: ColumnTask) => {
  const dispatch = useContext(AppDispatchContext);
  const [isCompact, setIsCompact] = useState(true);

  const toggleIsCompact = () => setIsCompact(!isCompact);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(actions.deleteTask(task.id));
  };

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
            <BinWrapper onClick={handleDelete}>
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
};

export default styled(Task)``;
