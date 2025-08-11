import './app.css'
import AppRoutes from './pages'
import { useState } from "preact/hooks"
import { FileContext } from "./contexts"

export function App() {
  const [file, setFile] = useState<File | undefined>()
  return (
    <FileContext.Provider value={{ file, setFile }}>
      <AppRoutes/>
    </FileContext.Provider>
  )
}
