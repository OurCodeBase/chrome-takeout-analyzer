import { createContext } from "preact";
import type { Dispatch, StateUpdater } from "preact/hooks";

export interface DataContextType {
  "History"?: any,
  "Settings"?: any,
  "Extensions"?: any,
  "OS Settings"?: any,
  "Device Information"?: any,
  "Addresses and more"?: any,
}

type ContextValues = {
  data: DataContextType | undefined,
  setData: Dispatch<StateUpdater<DataContextType | undefined>>
}

export default createContext<ContextValues | undefined>(undefined)
