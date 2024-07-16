import { useReducer } from "react";
import appReducer from "../Reducers/AppReducer";
import { emptyAppState } from "../constants";
import { AppContext, AppDispatchContext } from "../Contexts/AppContext";
import { ReactNode } from "react";
import { AppState, TaskAction } from "../types";

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer<React.Reducer<AppState, TaskAction>>(
    appReducer,
    emptyAppState
  );

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}
