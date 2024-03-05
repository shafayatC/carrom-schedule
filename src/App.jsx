import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import SchedulePage from "./pages/SchedulePage/SchedulePage"


function App() {


  return (
    <>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/carrom-schedule" element={<SchedulePage />} />
    
      </Routes>
    </>
  )
}

export default App
