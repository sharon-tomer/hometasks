import CreateTask from "./Components/CreateTask/CreateTask";
import { default as ColumnArea } from "./Components/ColumnsWrapper/ColumnsWrapper";
import { TaskList, TaskToCreate, TaskToUpdate } from "./types";
import { JSONBinFetchConfig } from "./configs";
import useFetch from "./Hooks/useFetch";
import {
  Background,
  ColumnsWrapper,
  CreateTaskWrapper,
  Grid,
  Title,
} from "./Styles/AppStyles";
import { createTask, deleteTask, updateTask } from "./utils/TaskHandler";
import useAPIData from "./Hooks/useAPIData";

interface ApiResponse {
  record: {
    tasks: TaskList;
  };
  metadata: any;
}

function App() {
  const { isLoading, apiData } = useFetch<ApiResponse>(JSONBinFetchConfig.get);
  const { columns, setColumns, tasks, setTasks } = useAPIData({ apiData });

  function handleNewTask(newTask: TaskToCreate) {
    const { modifiedTasks, modifiedColumns } = createTask(
      newTask,
      tasks,
      columns
    );
    setTasks(modifiedTasks);
    setColumns(modifiedColumns);
  }

  function handleUpdateTask(modifiedFields: TaskToUpdate) {
    if (!modifiedFields.id || !tasks[modifiedFields.id]) {
      return;
    }
    const modifiedTask = updateTask(modifiedFields, tasks);

    setTasks({
      ...tasks,
      modifiedTask,
    });
  }

  function handleDeleteTask(taskId: string) {
    if (!taskId || !tasks[taskId]) {
      return;
    }
    let modifiedTasks = deleteTask(taskId, tasks);
    setTasks(modifiedTasks);
  }

  return (
    <div>
      <Background />
      <Grid>
        <Title>Productivity?</Title>
        <CreateTaskWrapper>
          <CreateTask onSubmit={handleNewTask}></CreateTask>
        </CreateTaskWrapper>
        <ColumnsWrapper>
          <ColumnArea
            columns={columns}
            tasks={tasks}
            setColumns={setColumns}
            updateTask={handleUpdateTask}
            deleteTask={handleDeleteTask}
          />
        </ColumnsWrapper>
      </Grid>
    </div>
  );
}

export default App;
