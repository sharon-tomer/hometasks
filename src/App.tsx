import TaskCreationForm from "./Components/TaskCreationForm/TaskCreationForm";
import { default as ColumnArea } from "./Components/ColumnsWrapper/ColumnsWrapper";
import {
  Background,
  ColumnsWrapper,
  CreateTaskWrapper,
  Grid,
  Title,
} from "./Styles/AppStyles";
import { useLocalStorage } from "./Hooks/useLocalStorage";
import { useRemoteDB } from "./Hooks/useRemoteDB";

function App() {
  useLocalStorage();
  useRemoteDB();

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
