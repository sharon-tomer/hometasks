import './App.css';
import Column from './Components/Column/Column';
import generateMockData from './helpers/mock';
import { complexity } from './constants';
import { ColumnProps, ColumnsList, TaskList, TaskProps } from './types';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';

const initialColumns: ColumnsList = {
  '<15': {id: '<15', title: '<15 Minutes', taskIds: [], tasks: {}},
  '<60': {id: '<60', title: '<60 Minutes', taskIds: [], tasks: {}},
  '>60': {id: '>60', title: '>60 Minutes', taskIds: [], tasks: {}}
}

const initialTasks: TaskList = generateMockData();

Object.values(initialTasks).forEach((task) => {
  initialColumns[task.complexity].taskIds.push(task.id);
});

function App() {
  const [columns, setColumns] = useState(initialColumns)
  const [tasks, setTasks] = useState(initialTasks);

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
      console.log('setting new columns:');
      console.log({
        ...columns,
        [newColumn.id]: newColumn
      });
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
      console.log('setting new columns:');
      console.log({
        ...columns,
        [newSouceColumn.id]: newSouceColumn,
        [newDestColumn.id]: newDestColumn
      });
      setColumns({
        ...columns,
        [newSouceColumn.id]: newSouceColumn,
        [newDestColumn.id]: newDestColumn
      });
    }
  }

  const handleDragStart = (result: DropResult) => {

  }
  const handleDragUpdate = (result: DropResult) => {

  }

  return (
    <div className="App">
      <div className="columns">
        <DragDropContext onDragEnd={handleDragEnd}>
              {
                Object.values(columns).map((columnProps, index) => 
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
    </div>
  );



}

export default App;
