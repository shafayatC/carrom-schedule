import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import SchedulePage from "./pages/SchedulePage/SchedulePage"
import { createContext, useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SignInPage from "./pages/SignUpPage/SignInPage";
import SignUpPageUpdate from "./pages/SignUpPage/SignUpPageUpdate";

export const dataContextManager = createContext();

function App() {

  // const [getApiBasicUrl] = useState("http://localhost/wordpress/wp-json/carrom/v1"); // for cpanel server
  const [getApiBasicUrl] = useState("https://api2.thekowcompany.com/wp-json/carrom/v1"); // for cpanel server
  const [getUserInfo, setUserInfo] = useState(null);
  const [scheduleTable, setscheduleTable] = useState(null);

  return (
    <>
      <dataContextManager.Provider value={[getUserInfo, setUserInfo, getApiBasicUrl, scheduleTable, setscheduleTable]}>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPageUpdate />} />
          {/* <Route path="/carrom-schedule" element={<SchedulePage />} /> */}
          <Route path="/carrom-schedule/" element={<PrivateRoute />}>
            <Route
              path="table"
              element={<SchedulePage />}
            />
          </Route>
        </Routes>
      </dataContextManager.Provider>
    </>
  )
}

export default App
