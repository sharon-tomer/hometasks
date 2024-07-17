import { useEffect, useRef, useContext, useState } from "react";
import { actions } from "../Actions/TaskActions";
import { AppContext, AppDispatchContext } from "../Contexts/AppContext";
import { JSONBinFetchConfig } from "../configs";
import { SERVER_UPDATE_INTERVAL } from "../constants";
import { ApiResponse } from "../types";
import { makeAPIRequest } from "../utils/makeAPIRequest";

export function useRemoteDB() {
  const dispatch = useContext(AppDispatchContext);
  const { tasks, localVersion } = useContext(AppContext);
  const [apiData, setApiData] = useState<ApiResponse>();
  const initialLoadRef = useRef(true);
  const versionRef = useRef(0);

  function updateServerIfNeeded() {
    if (!initialLoadRef.current && localVersion > versionRef.current) {
      console.log("updating server to version ", localVersion);

      const requestBody = JSON.stringify({
        tasks,
        version: localVersion,
      });
      makeAPIRequest(JSONBinFetchConfig.put.url, {
        ...JSONBinFetchConfig.put.options,
        body: requestBody,
      });
    }
  }
  // initial server GET
  useEffect(() => {
    async function fetchInitialDate() {
      const response = await makeAPIRequest(
        JSONBinFetchConfig.get.url,
        JSONBinFetchConfig.get.options
      );
      console.log(
        "got initial server response. version",
        response.record.version
      );
      setApiData(response as ApiResponse);
      updateServerIfNeeded();
    }
    fetchInitialDate();
  }, [dispatch]);

  // Sync tasks with the server if it's behind local storage
  useEffect(() => {
    if (apiData?.record?.tasks && initialLoadRef.current) {
      if (apiData?.record?.version > localVersion) {
        console.log(
          "server version",
          apiData.record.version,
          "local version",
          localVersion
        );
        dispatch(
          actions.bulkAddTasks(apiData.record.tasks, apiData.record.version)
        );
        versionRef.current = apiData.record.version;
      }
      initialLoadRef.current = false;
    }
  }, [apiData, dispatch]);

  // Periodically update the server with the tasks
  useEffect(() => {
    const interval = setInterval(() => {
      updateServerIfNeeded();
    }, SERVER_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [tasks]);

  return { isLoaded: !initialLoadRef.current };
}
