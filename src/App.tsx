import './App.css';
import { generateMockData, generateUniqueId } from './helpers/mock';
import { useState } from 'react';
import CreateTask from './Components/CreateTask/CreateTask';
import ColumnsWrapper from './Components/ColumnsWrapper/ColumnsWrapper';
import { ColumnsList, TaskList, TaskToCreate } from './types';

const initialColumns: ColumnsList = {
  '<15': {id: '<15', title: '< 15 Minutes', taskIds: []},
  '<60': {id: '<60', title: '< 60 Minutes', taskIds: []},
  '>60': {id: '>60', title: '> 60 Minutes', taskIds: []}
}

const initialTasks: TaskList = generateMockData();

Object.values(initialTasks).forEach((task) => {
  initialColumns[task.complexity].taskIds.push(task.id);
});

function App() {
  const [columns, setColumns] = useState(initialColumns)
  const [tasks, setTasks] = useState(initialTasks);

  function handleNewTask(newTask: TaskToCreate) {
    const id = generateUniqueId('task');
    const task = {...newTask, id};
    setTasks({
      [id]: {
        ...task,
        id
      },
      ...tasks
    });
    setColumns({
      ...columns,
      [task.complexity]: {
        ...columns[task.complexity],
        taskIds: [...columns[task.complexity].taskIds, id]
      },
    });
  }

  return (
    <div className="App">
      <ColumnsWrapper columns={columns} tasks={tasks} setColumns={setColumns}></ColumnsWrapper>
      <CreateTask onSubmit={handleNewTask}></CreateTask>
    </div>
  );



}

export default App;
