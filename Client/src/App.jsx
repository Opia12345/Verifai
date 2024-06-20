import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "../tailwind/Output.css";
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
import Sidenav from "./Components/Sidenav";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  useEffect(() => {
    if (
      !userId &&
      !["/", "/signin", "/emailConfirmed"].includes(location.pathname)
    ) {
      navigate("/unauthorized");
    }
  }, [userId, location.pathname, navigate]);

  useEffect(() => {
    const handleBackButton = (event) => {
      if (!userId) {
        event.preventDefault();
        navigate("/");
      }
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [userId, navigate]);

  const excludedRoutes = [
    "/",
    "/signin",
    "/options",
    "/emailConfirmation/:userId",
    "/emailConfirmation",
    "/emailConfirmed",
    "/passwordUpdated",
    "/updatePassword/:userId",
    "/unauthorized",
    "/otpConfirmation/:userId",
    "/forgotPassword",
    "/otpOne",
    "/otpTwo",
    "/qrOne",
    "/qrTwo",
  ];

  const showNav =
    userId &&
    !excludedRoutes.some((route) =>
      new RegExp(`^${route.replace(/:[^\s/]+/g, "[^/]+")}$`).test(
        location.pathname
      )
    );

  return (
    <>
      {showNav && <Sidenav />}
      <Routes>
        <Route path="/" element={<Register />} />
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
        <Route path="/unauthorized" element={<Fallback />} />

        {/* protected routes  */}
        <Route
          path="/otpOne"
          element={
            <PrivateRoute>
              <OtpOne />
            </PrivateRoute>
          }
        />
        <Route
          path="/otpTwo"
          element={
            <PrivateRoute>
              <OtpTwo />
            </PrivateRoute>
          }
        />
        <Route
          path="/qrOne"
          element={
            <PrivateRoute>
              <QrOne />
            </PrivateRoute>
          }
        />
        <Route
          path="/qrTwo"
          element={
            <PrivateRoute>
              <QrTwo />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/generator"
          element={
            <PrivateRoute>
              <PasswordGenerator />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/accountSettings"
          element={
            <PrivateRoute>
              <AccountSettings />
            </PrivateRoute>
          }
        />
        <Route
          path="/passwordReset"
          element={
            <PrivateRoute>
              <PasswordReset />
            </PrivateRoute>
          }
        />
        <Route
          path="/help"
          element={
            <PrivateRoute>
              <Help />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
