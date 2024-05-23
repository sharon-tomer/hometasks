import React, {forwardRef } from "react";
import { ColumnProps } from "../../types";
import Task from "../Task/Task";
import './Column.css'
import styled from 'styled-components';
import { Droppable } from "@hello-pangea/dnd";

const Container = styled.div`
    width: 20vw;
    padding: 12px;
    margin: 12px;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    inset: -1px -1px 2px rgba(255, 255, 255, 0.5);
    border: 1px solid #ddd;
`;


function Column(props: ColumnProps, ref: React.LegacyRef<HTMLDivElement>) {
  return (
    <Droppable droppableId={`${props.id}`}>
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          <div className="header">
              <div className="title">{props.title}</div>
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