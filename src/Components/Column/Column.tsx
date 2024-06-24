import React, { forwardRef } from "react";
import { ColumnProps } from "../../types";
import Task from "../Task/Task";
import styled from "styled-components";
import { Droppable } from "@hello-pangea/dnd";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 0 24px;
`;

const Card = styled.div`
  /* min-height: 60px; */
  min-height: 80px;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 12px;
  margin: 12px;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: calc(6px + 2vmin);
  color: var(--primary-color-dark);
  text-align: center;
  margin-bottom: 12px;
  margin-top: 12px;
  font-weight: 800;
  font-family: "Roboto", sans-serif;
  letter-spacing: 1px;
`;

const NoTasks = styled.div`
  font-size: calc(6px + 1vmin);
  color: var(--secondary-color-dark);
  font-weight: 200;
  font-family: "Roboto", sans-serif;
  letter-spacing: 1px;
  text-align: center;
`;

function Column(props: ColumnProps, ref: React.LegacyRef<HTMLDivElement>) {
  console.log(props);
  return (
    <Container>
      <Title>{props.title}</Title>
      <Droppable droppableId={`${props.id}`}>
        {(provided) => (
          <Card ref={provided.innerRef} {...provided.droppableProps}>
            <div>
              {props.taskIds.length ? (
                props.taskIds.map((taskId, index) => {
                  return (
                    <Task key={taskId} {...props.tasks[taskId]} index={index} />
                  );
                })
              ) : (
                <NoTasks>... no tasks</NoTasks>
              )}
            </div>
            {provided.placeholder}
          </Card>
        )}
      </Droppable>
    </Container>
  );
}

export default styled(forwardRef(Column))``;
