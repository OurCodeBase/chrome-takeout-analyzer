import { FileContext } from "../contexts"
import { useContext } from "preact/hooks"

export default function() {
  const context = useContext(FileContext)
  if (!context) throw new Error('Context cannot be initialised...')
  return context
}
