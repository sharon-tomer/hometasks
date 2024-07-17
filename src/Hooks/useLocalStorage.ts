import { useContext, useEffect, useRef } from "react";
import { actions } from "../Actions/TaskActions";
import { AppContext, AppDispatchContext } from "../Contexts/AppContext";

export function useLocalStorage() {
  const dispatch = useContext(AppDispatchContext);
  const { tasks, localVersion } = useContext(AppContext);
  const versionRef = useRef(0);

  // Load tasks from local storage on initial render
  useEffect(() => {
    const storedData = localStorage.getItem("appData");
    if (storedData) {
      const { tasks, version } = JSON.parse(storedData);
      console.log("found stored data. version:", version);
      versionRef.current = version;
      dispatch(actions.bulkAddTasks(tasks, version));
    }
  }, [dispatch]);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    if (localVersion > versionRef.current) {
      console.log("updating local storage to version ", localVersion);
      localStorage.setItem(
        "appData",
        JSON.stringify({ tasks, version: localVersion })
      );
    }
  }, [tasks]);
}
