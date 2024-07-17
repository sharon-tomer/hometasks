import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Column from "../Column/Column";
import { Category } from "../../constants";
import { useContext } from "react";
import { Container, ColumnWrapper } from "../../Styles/ColumnWrapperStyles";
import { AppContext, AppDispatchContext } from "../../Contexts/AppContext";
import { actions } from "../../Actions/TaskActions";

function ColumnsWrapper() {
  const { columns } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    dispatch(
      actions.moveTask(
        draggableId,
        source.droppableId as Category,
        destination.droppableId as Category,
        source.index,
        destination.index
      )
    );
  };

  return (
    <Container>
      <DragDropContext onDragEnd={handleDragEnd}>
        <ColumnWrapper $column={1} $row={1} $size={1}>
          <Column {...columns[Category.lessThan15Minutes]} />
        </ColumnWrapper>
        <ColumnWrapper $column={2} $row={1} $size={1}>
          <Column {...columns[Category.moreThan15Minutes]} />
        </ColumnWrapper>
        <ColumnWrapper $column={3} $row={1} $size={1}>
          <Column {...columns[Category.done]} />
        </ColumnWrapper>
      </DragDropContext>
    </Container>
  );
}

export default ColumnsWrapper;
