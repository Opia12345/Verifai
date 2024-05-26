import { Route, Routes } from "react-router-dom";
import "../tailwind/Output.css";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import PasswordGenerator from "./Pages/PasswordGenerator";
import Settings from "./Pages/Settings";
import AccountSettings from "./Pages/AccountSettings";
import PasswordReset from "./Pages/PasswordReset";
function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generator" element={<PasswordGenerator />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/accountSettings" element={<AccountSettings />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
      </Routes>
    </>
  );
}

export default App;
