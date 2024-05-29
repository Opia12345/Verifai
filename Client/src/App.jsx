import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "../tailwind/Output.css";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import PasswordGenerator from "./Pages/PasswordGenerator";
import Settings from "./Pages/Settings";
import AccountSettings from "./Pages/AccountSettings";
import PasswordReset from "./Pages/PasswordReset";
import Help from "./Pages/Help";
import Register from "./Pages/Register";
import SignIn from "./Pages/SignIn";
import EmailConfirmation from "./Routes/EmailConfirmation";
import EmailConfirmed from "./Routes/EmailConfirmed";
import ForgotPassword from "./Routes/FogotPassword";
import Otp from "./Routes/Otp";
import UpdatePassword from "./Routes/UpdatePassword";
import PasswordUpdated from "./Routes/PasswordUpdated";
import Fallback from "./Routes/FallBack";
import { useEffect } from "react";
import SignOptions from "./Pages/SignOptions";
import OtpOne from "./Routes/OtpOne";
import OtpTwo from "./Routes/OtpTwo";
import QrOne from "./Routes/QrOne";
import QrTwo from "./Routes/QrTwo";
function App() {
  const redirect = useNavigate();
  const route = useLocation();
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  useEffect(() => {
    if (
      !userId &&
      !["/", "/register", "/signin", "/emailConfirmed", "/qrOne"].includes(route.pathname)
    ) {
      redirect("/unauthorized");
    }
  }, []);

  useEffect(() => {
    const handleBackButton = (event) => {
      if (!userId) {
        event.preventDefault();
        redirect("/");
      }
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [userId, redirect]);
  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/emailConfirmation/:userId"
          element={<EmailConfirmation />}
        />
        <Route path="/emailConfirmed" element={<EmailConfirmed />} />
        <Route path="/updatePassword/:userId" element={<UpdatePassword />} />
        <Route path="/options" element={<SignOptions />} />
        <Route path="/passwordUpdated" element={<PasswordUpdated />} />
        <Route path="/otpConfirmation/:userId" element={<Otp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/otpOne" element={<OtpOne />} />
        <Route path="/otpTwo" element={<OtpTwo />} />
        <Route path="/qrOne" element={<QrOne />} />
        <Route path="/qrTwo" element={<QrTwo />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generator" element={<PasswordGenerator />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/accountSettings" element={<AccountSettings />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
        <Route path="/help" element={<Help />} />
        <Route path="/unauthorized" element={<Fallback />} />
      </Routes>
    </>
  );
}

export default App;
