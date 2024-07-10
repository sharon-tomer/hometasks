import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Column from "../Column/Column";
import { ColumnsList, TaskList, TaskToUpdate } from "../../types";
import { Category } from "../../constants";
import { useCallback, useEffect } from "react";
import { Container, ColumnWrapper } from "../../Styles/ColumnWrapperStyles";

interface ColumnsWrapperProps {
  columns: ColumnsList;
  tasks: TaskList;
  setColumns: (columns: ColumnsList) => void;
  updateTask: (taskToUpdate: TaskToUpdate) => void;
  deleteTask: (taskId: string) => void;
}

function ColumnsWrapper({
  columns,
  tasks,
  setColumns,
  updateTask,
  deleteTask,
}: ColumnsWrapperProps) {
  useEffect(() => {
    const newColumns = Object.fromEntries(
      Object.entries(columns).map(([columnId, column]) => {
        return [
          columnId,
          {
            ...column,
            taskIds: column.taskIds,
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

      const orderedNewTasks = newTasks;

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
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];

      const newSouceTasks = Array.from(sourceColumn.taskIds);
      const newDestTasks = Array.from(destColumn.taskIds);

      newSouceTasks.splice(source.index, 1);
      newDestTasks.splice(destination.index, 0, draggableId);

      const newSouceColumn = {
        ...sourceColumn,
        taskIds: newSouceTasks,
      };

      const newDestColumn = {
        ...destColumn,
        taskIds: newDestTasks,
      };

      setColumns({
        ...columns,
        [newSouceColumn.id]: newSouceColumn,
        [newDestColumn.id]: newDestColumn,
      });
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
