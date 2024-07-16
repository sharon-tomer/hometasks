import { createContext } from "react";
import { emptyAppState } from "../constants";
import { AppState, DispatchType } from "../types";

export const AppContext = createContext<AppState>(emptyAppState);
export const AppDispatchContext = createContext<DispatchType>(() => {});
