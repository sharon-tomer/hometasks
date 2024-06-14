import React, {forwardRef } from "react";
import { ColumnProps } from "../../types";
import Task from "../Task/Task";
import styled from 'styled-components';
import { Droppable } from "@hello-pangea/dnd";

const Container = styled.div`
  max-height: 80vh;
  overflow: auto;
  width: 20vw;
  padding: 12px;
  margin: 12px;
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  inset: -1px -1px 2px rgba(255, 255, 255, 0.5);
  background:rgba(204, 196, 196, 0.5);
`;

const Title = styled.div`
  font-size: calc(6px + 2vmin);
  color: #5e0042;
  text-align: center;
  margin-bottom: 12px;
  margin-top: 12px;
  font-weight: 400;
  font-family: "Spicy Rice", serif;
  text-transform: uppercase;
  letter-spacing: 1px;
`


function Column(props: ColumnProps, ref: React.LegacyRef<HTMLDivElement>) {
  return (
    <Droppable droppableId={`${props.id}`}>
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          <div className="header">
              <Title className="title">{props.title}</Title>
              {props.taskIds.map((taskId, index) => {
                  return (<Task key={taskId} {...props.tasks[taskId]} index={index}/>)})
              }
          </div>
          { provided.placeholder }
        </Container>
      )}
    </Droppable>
  );
}


export default styled(forwardRef(Column))``;