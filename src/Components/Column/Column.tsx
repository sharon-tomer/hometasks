import React, { forwardRef, useContext } from "react";
import { ColumnProps } from "../../types";
import Task from "../Task/Task";
import styled from "styled-components";
import { Droppable } from "@hello-pangea/dnd";
import { AppContext } from "../../Contexts/AppContext";
import { Container, Title, Card, NoTasks } from "./style";

const Column = (props: ColumnProps, ref: React.LegacyRef<HTMLDivElement>) => {
  const { tasks } = useContext(AppContext);

  return (
    <Container>
      <Title>{props.title}</Title>
      <Droppable droppableId={`${props.id}`}>
        {(provided) => (
          <Card ref={provided.innerRef} {...provided.droppableProps}>
            <div>
              {props.taskIds?.length ? (
                props.taskIds.map((taskId, index) => {
                  return <Task key={taskId} {...tasks[taskId]} index={index} />;
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
};

export default styled(forwardRef(Column))``;
