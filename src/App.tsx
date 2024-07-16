import TaskCreationForm from "./Components/TaskCreationForm/TaskCreationForm";
import { default as ColumnArea } from "./Components/ColumnsWrapper/ColumnsWrapper";
import { TaskList } from "./types";
import { JSONBinFetchConfig } from "./configs";
import useFetch from "./Hooks/useFetch";
import {
  Background,
  ColumnsWrapper,
  CreateTaskWrapper,
  Grid,
  Title,
} from "./Styles/AppStyles";

import { useContext, useEffect } from "react";
import { AppDispatchContext } from "./Contexts/AppContext";
import { actions } from "./Actions/TaskActions";

interface ApiResponse {
  record: {
    tasks: TaskList;
  };
  metadata: any;
}

function App() {
  const dispatch = useContext(AppDispatchContext);
  const { /*isLoading,*/ apiData } = useFetch<ApiResponse>(
    JSONBinFetchConfig.get
  );

  useEffect(() => {
    apiData?.record?.tasks &&
      dispatch(actions.bulkAddTasks(apiData.record.tasks));
  }, [apiData]);

  return (
    <div>
      <Background />
      <Grid>
        <Title>Productivity?</Title>
        <CreateTaskWrapper>
          <TaskCreationForm />
        </CreateTaskWrapper>
        <ColumnsWrapper>
          <ColumnArea />
        </ColumnsWrapper>
      </Grid>
    </div>
  );
}

export default App;
