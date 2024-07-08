import { generateUniqueId } from "./utils/mock";
import { useCallback, useEffect, useRef, useState } from "react";
import CreateTask from "./Components/CreateTask/CreateTask";
import { default as ColumnArea } from "./Components/ColumnsWrapper/ColumnsWrapper";
import {
  ColumnsList,
  TaskList,
  TaskProps,
  TaskToCreate,
  TaskToUpdate,
} from "./types";
import { JSONBinFetchConfig } from "./configs";
import useFetch from "./Hooks/useFetch";
import { emptyColumns, emptyTasks } from "./constants";
import styled from "styled-components";
import {
  Background,
  ColumnsWrapper,
  CreateTaskWrapper,
  Grid,
  Title,
} from "./Styles/AppStyles";

interface ApiResponse {
  record: {
    tasks: TaskList;
  };
  metadata: any;
}

function App() {
  const { isLoading, apiData } = useFetch<ApiResponse>(JSONBinFetchConfig.get);
  const [columns, setColumns] = useState<ColumnsList>(emptyColumns);
  const [tasks, setTasks] = useState<TaskList>(emptyTasks);
  const processedData = useRef(false);

  const processApiData = useCallback(() => {
    if (apiData?.record?.tasks && !processedData.current) {
      const tasksFromServer = apiData.record.tasks;
      setTasks(tasksFromServer as TaskList);

      let initialColumns = JSON.parse(JSON.stringify(emptyColumns));

      Object.values(tasksFromServer as TaskList).forEach((task) => {
        if (initialColumns[task.category]) {
          initialColumns[task.category].taskIds.push(task.id);
        }
      });

      setColumns(initialColumns);
      processedData.current = true;
    }
  }, [apiData]);

  useEffect(() => {
    processApiData();
  }, [processApiData]);

  function handleNewTask(newTask: TaskToCreate) {
    const id = generateUniqueId("task");
    const task = { ...newTask, id };
    setTasks({
      [id]: {
        ...task,
        id,
      },
      ...tasks,
    });
    setColumns({
      ...columns,
      [task.category]: {
        ...columns[task.category],
        taskIds: [...columns[task.category].taskIds, id],
      },
    });
  }

  function updateTask(modifiedFields: TaskToUpdate) {
    if (!tasks[modifiedFields.id]) {
      return;
    }
    const currentTask = tasks[modifiedFields.id];

    const modifiedTask = {
      ...currentTask,
      ...modifiedFields,
    };

    setTasks({
      ...tasks,
      [modifiedFields.id]: modifiedTask,
    });
    if (currentTask.category !== modifiedFields.category) {
      setColumns({
        ...columns,
        [currentTask.category]: {
          ...columns[currentTask.category],
          taskIds: columns[currentTask.category].taskIds.filter(
            (id) => id !== modifiedFields.id
          ),
        },
        [modifiedTask.category]: {
          ...columns[modifiedTask.category],
          taskIds: [
            ...columns[modifiedTask.category].taskIds,
            modifiedFields.id,
          ],
        },
      });
    }
  }

  function deleteTask(taskId: string) {
    let modifiedTasks = { ...tasks };
    delete modifiedTasks[taskId];
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
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </ColumnsWrapper>
      </Grid>
    </div>
  );
}

export default App;
