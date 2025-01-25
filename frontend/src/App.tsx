import { useEffect } from "react"

export const App = () => {
  useEffect(() => {
    document.title="Hello World!"
  }, [])
  
  return (
    <div>Hello World</div>
  )
}
