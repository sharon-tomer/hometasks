import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Column from "../Column/Column";
import { ColumnsList, TaskList, TaskProps, TaskToUpdate } from "../../types";
import styled from "styled-components";
import { Category } from "../../constants";
import { useCallback, useEffect } from "react";
import { orderTasks as unboundOrderTasks } from "../../utils/helpers";

interface ColumnsWrapperProps {
  columns: ColumnsList;
  tasks: TaskList;
  setColumns: (columns: ColumnsList) => void;
  updateTask: (taskToUpdate: TaskToUpdate) => void;
  deleteTask: (taskId: string) => void;
}

const Container = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 1fr 1fr;
  grid-gap: 12px;
  padding: 12px;
  width: 90vw;
  margin: 0 auto;
  min-height: 50vh;
`;

const ColumnWrapper = styled.div<{
  $column: number;
  $row: number;
  $size: number;
}>`
  grid-column: ${(props) => props.$column};
  grid-row-start: ${(props) => props.$row};
  grid-row-end: ${(props) => props.$row + props.$size};
`;

function ColumnsWrapper({
  columns,
  tasks,
  setColumns,
  updateTask,
  deleteTask,
}: ColumnsWrapperProps) {
  const orderTasks = useCallback(
    (taskIds: string[]) => unboundOrderTasks(tasks, taskIds),
    [tasks]
  );

  useEffect(() => {
    const newColumns = Object.fromEntries(
      Object.entries(columns).map(([columnId, column]) => {
        return [
          columnId,
          {
            ...column,
            taskIds: orderTasks(column.taskIds),
          },
        ];
      })
    );

    setColumns(newColumns);
  }, [tasks]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // same column drop
    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId];
      const newTasks = Array.from(column.taskIds);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, draggableId);

      const orderedNewTasks = orderTasks(newTasks);

      const newColumn = {
        ...column,
        taskIds: orderedNewTasks,
      };
      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
    }

    // different column drop
    else {
      //   const sourceColumn = columns[source.droppableId];
      //   const destColumn = columns[destination.droppableId];

      //   const newSouceTasks = Array.from(sourceColumn.taskIds);
      //   const newDestTasks = Array.from(destColumn.taskIds);

      //   newSouceTasks.splice(source.index, 1);
      //   newDestTasks.splice(destination.index, 0, draggableId);

      //   const orderedNewSourceTasks = orderTasks(newSouceTasks);
      //   const orderedNewDestTasks = orderTasks(newDestTasks);

      //   const newSouceColumn = {
      //     ...sourceColumn,
      //     taskIds: orderedNewSourceTasks,
      //   };

      //   const newDestColumn = {
      //     ...destColumn,
      //     taskIds: orderedNewDestTasks,
      //   };

      //   setColumns({
      //     ...columns,
      //     [newSouceColumn.id]: newSouceColumn,
      //     [newDestColumn.id]: newDestColumn,
      //   });
      updateTask({
        id: draggableId,
        category: destination.droppableId as Category,
      });
    }
  };

  return (
    <Container>
      <DragDropContext onDragEnd={handleDragEnd}>
        <ColumnWrapper $column={1} $row={1} $size={1}>
          <Column {...columns[Category.lessThan15Minutes]} tasks={tasks} />
        </ColumnWrapper>
        <ColumnWrapper $column={2} $row={1} $size={1}>
          <Column {...columns[Category.moreThan15Minutes]} tasks={tasks} />
        </ColumnWrapper>{" "}
        <ColumnWrapper $column={3} $row={1} $size={1}>
          <Column {...columns[Category.done]} tasks={tasks} />
        </ColumnWrapper>
      </DragDropContext>
    </Container>
  );
}

export default ColumnsWrapper;
