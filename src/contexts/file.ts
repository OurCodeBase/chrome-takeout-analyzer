import { createContext } from "preact";
import type { Dispatch, StateUpdater } from "preact/hooks";

export interface FileContextType {
  file: File | undefined,
  setFile: Dispatch<StateUpdater<File | undefined>>
}

export default createContext<FileContextType | undefined>(undefined)
