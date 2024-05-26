import { Route, Routes } from "react-router-dom";
import "../tailwind/Output.css";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import PasswordGenerator from "./Pages/PasswordGenerator";
function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generator" element={<PasswordGenerator />} />
      </Routes>
    </>
  );
}

export default App;
