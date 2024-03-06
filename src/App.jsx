import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import SchedulePage from "./pages/SchedulePage/SchedulePage"
import { createContext, useState } from "react";

export const dataContextManager = createContext();

function App() {

  const [getApiBasicUrl] = useState("http://localhost/wordpress/wp-json/carrom/v1"); // for cpanel server
  const [getUserInfo, setUserInfo] = useState(null);
  const [scheduleTable, setscheduleTable] = useState(null);
  
  return (
    <>
      <dataContextManager.Provider value={[getUserInfo, setUserInfo, getApiBasicUrl, scheduleTable, setscheduleTable]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/carrom-schedule" element={<SchedulePage />} />
        </Routes>
      </dataContextManager.Provider>
    </>
  )
}

export default App
