import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Column from "../Column/Column";
import { ColumnsList, TaskList } from "../../types";

interface ColumnsWrapperProps {
    columns: ColumnsList,
    tasks: TaskList,
    setColumns: (columns: ColumnsList) => void
}

function ColumnsWrapper({columns, tasks, setColumns}: ColumnsWrapperProps) {

    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if(!destination) {
          return;
        }
        if( destination.droppableId === source.droppableId && 
            destination.index === source.index) {
          return;
        }
    
        // same column drop
        if(source.droppableId === destination.droppableId) {
          const column = columns[source.droppableId];
          const newTasks = Array.from(column.taskIds);
          newTasks.splice(source.index, 1);
          newTasks.splice(destination.index, 0, draggableId);
          const newColumn = {
            ...column,
            taskIds: newTasks
          }
          setColumns({
            ...columns,
            [newColumn.id]: newColumn
          });
        }
    
        // different column drop
        else {
          const sourceColumn = columns[source.droppableId];
          const destColumn = columns[destination.droppableId];
      
          const newSouceTasks = Array.from(sourceColumn.taskIds)
          const newDestTasks = Array.from(destColumn.taskIds)
      
          newSouceTasks.splice(source.index, 1);
          newDestTasks.splice(destination.index, 0 , draggableId);
      
          const newSouceColumn = {
            ...sourceColumn,
            taskIds: newSouceTasks
          }
      
          const newDestColumn = {
            ...destColumn,
            taskIds: newDestTasks
          }
    
          setColumns({
            ...columns,
            [newSouceColumn.id]: newSouceColumn,
            [newDestColumn.id]: newDestColumn
          });
        }
      }
    

    return (
        <div className="columns">
            <DragDropContext onDragEnd={handleDragEnd}>
                {
                    Object.values(columns).map((columnProps) => 
                        <Column 
                            key={columnProps.id} 
                            {...columnProps} 
                            taskIds={columns[columnProps.id].taskIds}
                            tasks={tasks}
                        />
                    )
                }
            </DragDropContext>
        </div>
    )
}

export default ColumnsWrapper;