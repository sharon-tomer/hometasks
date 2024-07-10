import { useEffect, useRef, useState } from "react";
import { emptyColumns, emptyTasks } from "../constants";
import { ColumnsList, TaskList } from "../types";

interface Props {
  apiData: any;
}

export default function useAPIData(props: Props) {
  const [tasks, setTasks] = useState<TaskList>(emptyTasks);
  const [columns, setColumns] = useState<ColumnsList>(emptyColumns);
  const didProcessData = useRef(false);

  useEffect(() => {
    if (props.apiData?.record?.tasks && !didProcessData.current) {
      setTasks(props.apiData.record.tasks);

      let initialColumns = JSON.parse(JSON.stringify(emptyColumns));

      Object.values(props.apiData.record.tasks as TaskList).forEach((task) => {
        if (initialColumns[task.category]) {
          initialColumns[task.category].taskIds.push(task.id);
        }
      });
      didProcessData.current = true;
      setColumns(initialColumns);
    }
  }, [props.apiData]);

  return { tasks, columns, setTasks, setColumns };
}
