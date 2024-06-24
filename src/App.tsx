import { generateUniqueId } from "./helpers/mock";
import { useCallback, useEffect, useRef, useState } from "react";
import CreateTask from "./Components/CreateTask/CreateTask";
import ColumnsWrapper from "./Components/ColumnsWrapper/ColumnsWrapper";
import { ColumnsList, TaskList, TaskToCreate } from "./types";
import { JSONBinFetchConfig } from "./configs";
import useFetch from "./Hooks/useFetch";
import { emptyColumns, emptyTasks } from "./constants";
import styled from "styled-components";

interface ApiResponse {
  record: {
    tasks: TaskList;
  };
  metadata: any;
}

const Background = styled.div`
  background-attachment: scroll;
  background-color: var(--background-color);
  min-height: 100vh;
  min-width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Title = styled.h1`
  color: var(--primary-color-dark);
  text-align: center;
  margin: 12px;
  font-size: calc(12px + 3vmin);
  font-weight: 800;
  font-family: "Roboto", sans-serif;
`;

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

  return (
    <div>
      <Background />
      <Title>Productivity?</Title>
      <CreateTask onSubmit={handleNewTask}></CreateTask>
      <ColumnsWrapper columns={columns} tasks={tasks} setColumns={setColumns} />
    </div>
  );
}

export default App;
