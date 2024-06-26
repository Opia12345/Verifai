import React, { useEffect, useState } from "react";
import {
  faArrowRight,
  faCopy,
  faEnvelope,
  faEye,
  faEyeSlash,
  faLink,
  faLock,
  faMagnifyingGlass,
  faPlus,
  faTimes,
  faTimesCircle,
  faTrashCan,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getApiUrl } from "../config";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(false);
  const [popup, setPopup] = useState(false);
  const [appPasswordStrength, setAppPasswordStrength] = useState(null);
  const [add, setAdd] = useState(false);
  const [password, setPassword] = useState(false);
  const [copy, setCopy] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;
  const apiUrl = getApiUrl(process.env.NODE_ENV);
  const [apps, setApps] = useState([]);
  const getDefaultImage = (appName) => {
    switch (appName?.toLowerCase()) {
      case "apple":
        return "/apple.svg";
      case "facebook":
        return "/fb.svg";
      case "instagram":
        return "/ig.svg";
      case "x":
        return "/x.svg";
      case "gmail":
        return "/gmail.svg";
      case "netflix":
        return "/netflix.png";
      case "snapchat":
        return "/snap.svg";
      case "tiktok":
        return "/tiktok.svg";
      default:
        return "/default.svg";
    }
  };

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await axios.get(`${apiUrl}/apps`, {
          params: { userId },
        });
        setApps(response.data);
      } catch (error) {
        console.error("Error fetching apps:", error);
      }
    };

    if (userId) {
      fetchApps();
    }
  }, [apiUrl, userId]);

  const styles = {
    enter: "transform -translate-x-full opacity-0",
    enterActive:
      "transform translate-x-0 opacity-100 transition-all duration-500 ease-in-out",
    exitActive:
      "transform -translate-x-full opacity-0 transition-all duration-500 ease-in-out",
  };

  const evaluatePasswordStrength = (password) => {
    if (!password) {
      return "";
    }

    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    const superStrongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

    if (superStrongPassword.test(password)) {
      return "Super Strong";
    } else if (strongPassword.test(password)) {
      return "Strong";
    } else {
      return "Weak";
    }
  };

  const passwordStrength = evaluatePasswordStrength(
    selectedApp?.appPassword || ""
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddApp = async (values, { resetForm }) => {
    const newApp = {
      appName: values.appName,
      appEmail: values.appEmail,
      appPassword: values.appPassword,
      appImage: values.appImage,
      appUrl: values.appUrl || "",
      userId,
    };

    try {
      const response = await axios.post(`${apiUrl}/create-app`, newApp);
      setApps([...apps, response.data]);
      setAdd(false);
      resetForm();
      window.location.reload();
      setSuccess(response.data.message);
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error) {
      console.error("Error adding new application:", error);
      setError(error.response?.data?.message || "Error Deleting application");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleAppClick = (app) => {
    setSelectedApp(app);
    setPopup(true);
  };

  const handleUpdateApp = (e) => {
    const { name, value } = e.target;
    setSelectedApp({ ...selectedApp, [name]: value });
  };

  const handleDeleteApp = async () => {
    try {
      await axios.delete(`${apiUrl}/delete-app/${selectedApp._id}`);
      setApps(apps.filter((app) => app._id !== selectedApp._id));
      setPopup(false);
    } catch (error) {
      setError(error.response?.data?.message || "Error Deleting application");
      setTimeout(() => {
        setError(null);
      }, 3000);
      console.error("Error deleting application:", error);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  const initialValues = {
    appName: "",
    appEmail: "",
    appPassword: "",
    appUrl: "",
  };

  const validationSchema = Yup.object().shape({
    appName: Yup.string().required("App Name is required"),
    appEmail: Yup.string().required("Email Address is required"),
    appPassword: Yup.string().required("Password is required"),
    appUrl: Yup.string(),
  });

  return (
    <>
      <CSSTransition
        in={success}
        classNames={styles}
        timeout={500}
        unmountOnExit
      >
        <div className="fixed top-10 lg:right-[40%] z-50 bg-slate-200/5 backdrop-blur-lg p-4 rounded-md flex items-center justify-center">
          <h5 className="flex items-center gap-4 text-center font-bold">
            <FontAwesomeIcon className="text-green-500" icon={faCheckCircle} />
            <small>{success}.</small>
          </h5>
        </div>
      </CSSTransition>

      <CSSTransition in={error} classNames={styles} timeout={500} unmountOnExit>
        <div className="fixed top-10 lg:right-[40%] z-50 bg-slate-200/5 backdrop-blur-lg p-4 rounded-md flex items-center justify-center">
          <h5 className="flex items-center gap-4 text-center font-bold">
            <FontAwesomeIcon className="text-red-500" icon={faTimesCircle} />
            <small>{error}.</small>
          </h5>
        </div>
      </CSSTransition>
      <section className="lg:ml-[250px] lg:p-8 p-4 h-screen">
        <h1 className="font-bold text-3xl">Passwords</h1>
        <span className="flex items-center bg-slate-200/20 md:w-1/2 w-full gap-2 g:p-8 rounded-md p-2 mt-4 lg:ml-[250px]">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            type="text"
            placeholder="Type to filter..."
            className="bg-transparent text-white font-light text-xs w-full outline-none"
            value={search}
            onChange={handleChange}
          />
        </span>
        <div className="mt-12 grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {apps.length === 0 ? (
            <div className="flex items-center justify-center flex-col mt-[150px] col-span-3 w-full gap-4">
              <img src="/empty.png" className="w-[150px]" alt="" />
              <h1>No Stored Passwords</h1>
            </div>
          ) : (
            apps
              .filter((app) =>
                (app.appName?.toLowerCase() || "").includes(
                  search.toLowerCase()
                )
              )
              .map((app, index) => (
                <div key={index}>
                  <span
                    onClick={() => handleAppClick(app)}
                    className="flex gap-4 bg-slate-200/5 hover:bg-slate-200/20 cursor-pointer transition-all ease-in-out duration-200 p-2 backdrop-blur-lg items-center justify-between rounded-md"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={getDefaultImage(app.appName)}
                        className="w-[40px]"
                      />
                      <div>
                        <h5 className="text-lg font-bold">{app.appName}</h5>
                        <small className="text-xs text-slate-500">
                          {app.appEmail}
                        </small>
                      </div>
                    </div>
                  </span>
                </div>
              ))
          )}
          <span
            onClick={() => setAdd(true)}
            className="p-4 h-4 w-4 bg-blue-700 flex items-center justify-center rounded-full fixed bottom-10 right-10"
          >
            <div className="flex items-center text-lg gap-4">
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </span>
        </div>
      </section>

      <CSSTransition in={popup} classNames={styles} timeout={600} unmountOnExit>
        <div className="fixed h-screen w-full z-50 flex items-center justify-center top-0 right-0 bg-slate-200/5 backdrop-blur-xl">
          <FontAwesomeIcon
            icon={faTimes}
            className="fixed top-8 right-8 text-xl cursor-pointer"
            onClick={() => setPopup(false)}
          />
          {selectedApp && (
            <div className="bg-slate-900 p-12 rounded-md w-[90%] lg:w-[40%]">
              <div className="flex justify-center items-center gap-2">
                <img
                  src={getDefaultImage(selectedApp.appName)}
                  className="w-[40px]"
                />
                <div>
                  <h5 className="text-xl font-bold">{selectedApp.appName}</h5>
                  <h5 className="text-xs">{selectedApp.appEmail}</h5>
                </div>
              </div>
              <div className="flex flex-col gap-4 items-start mt-6">
                <label>App Name</label>
                <span className="flex items-center bg-slate-200/20 w-full gap-2 rounded-md p-2">
                  <FontAwesomeIcon icon={faUser} />
                  <input
                    type="text"
                    name="appName"
                    value={selectedApp.appName}
                    onChange={handleUpdateApp}
                    className="bg-transparent text-white font-light text-xs w-full outline-none"
                  />
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() => handleCopy(selectedApp.appName)}
                  />
                </span>

                <label>Email Address</label>
                <span className="flex items-center bg-slate-200/20 w-full gap-2 rounded-md p-2">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input
                    type="email"
                    name="appEmail"
                    value={selectedApp.appEmail}
                    onChange={handleUpdateApp}
                    className="bg-transparent text-white font-light text-xs w-full outline-none"
                  />
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() => handleCopy(selectedApp.appEmail)}
                  />
                </span>

                <label>Password</label>
                <span className="flex items-center bg-slate-200/20 w-full gap-2 rounded-md p-2">
                  <FontAwesomeIcon icon={faLock} />
                  <input
                    type={password ? "text" : "password"}
                    name="appPassword"
                    value={selectedApp.appPassword}
                    onChange={handleUpdateApp}
                    className="bg-transparent text-white font-light text-xs w-full outline-none"
                  />
                  <FontAwesomeIcon
                    icon={password ? faEye : faEyeSlash}
                    onClick={() => setPassword(!password)}
                  />
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() => handleCopy(selectedApp.appPassword)}
                  />
                </span>
                <span
                  className={`text-xs ${
                    passwordStrength === "Super Strong"
                      ? "text-green-500"
                      : passwordStrength === "Strong"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {passwordStrength}
                </span>

                <label>URL</label>
                <span className="flex items-center bg-slate-200/20 w-full gap-2 rounded-md p-2">
                  <FontAwesomeIcon icon={faLink} />
                  <input
                    type="text"
                    name="appUrl"
                    value={selectedApp.appUrl}
                    onChange={handleUpdateApp}
                    className="bg-transparent text-white font-light text-xs w-full outline-none"
                  />
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() => handleCopy(selectedApp.appUrl)}
                  />
                </span>
                <button
                  onClick={handleDeleteApp}
                  className="flex items-center gap-2 rounded-md py-2 px-6 bg-red-600 hover:bg-red-800 duration-300 ease-in-out transition-all"
                >
                  <FontAwesomeIcon icon={faTrashCan} className="" />
                  <h5 className="text-xs">Delete App</h5>
                </button>
              </div>
            </div>
          )}
        </div>
      </CSSTransition>

      <CSSTransition in={add} classNames={styles} timeout={600} unmountOnExit>
        <div className="fixed h-screen w-full z-50 flex items-center justify-center top-0 right-0 bg-slate-200/5 backdrop-blur-xl">
          <FontAwesomeIcon
            icon={faTimes}
            className="fixed top-10 right-10 text-xl cursor-pointer"
            onClick={() => setAdd(false)}
          />
          <div className="bg-slate-900 p-12 rounded-md w-[90%] lg:w-[60%]">
            <h5 className="text-xl text-center font-bold">Add Application</h5>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleAddApp}
            >
              {({ values, setFieldValue }) => (
                <Form className="flex flex-col gap-4 items-start mt-6">
                  <label>Application Name</label>
                  <Field
                    name="appName"
                    type="text"
                    placeholder="Application Name"
                    className="bg-slate-200/20 text-white font-light text-xs w-full outline-none rounded-md p-2"
                  />
                  <ErrorMessage
                    name="appName"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                  <label>Email Address</label>
                  <Field
                    name="appEmail"
                    type="email"
                    placeholder="Email Address"
                    className="bg-slate-200/20 text-white font-light text-xs w-full outline-none rounded-md p-2"
                  />
                  <ErrorMessage
                    name="appEmail"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                  <label>Password</label>
                  <span className="flex items-center bg-slate-200/20 w-full gap-2 rounded-md p-2">
                    <Field
                      type={password ? "text" : "password"}
                      name="appPassword"
                      placeholder="Password"
                      className="bg-transparent text-white font-light text-xs w-full outline-none"
                      onChange={(e) => {
                        setFieldValue("appPassword", e.target.value);
                        setAppPasswordStrength(
                          evaluatePasswordStrength(e.target.value)
                        );
                      }}
                    />
                    <FontAwesomeIcon
                      icon={password ? faEye : faEyeSlash}
                      onClick={() => setPassword(!password)}
                    />
                  </span>
                  <span
                    className={`text-xs ${
                      appPasswordStrength === "Super Strong"
                        ? "text-green-500"
                        : appPasswordStrength === "Strong"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {appPasswordStrength}
                  </span>
                  <ErrorMessage
                    name="appPassword"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                  <label>URL</label>
                  <Field
                    name="appUrl"
                    type="text"
                    placeholder="URL"
                    className="bg-slate-200/20 text-white font-light text-xs w-full outline-none rounded-md p-2"
                  />
                  <ErrorMessage
                    name="appUrl"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 border rounded-md py-2 px-6 hover:bg-slate-200/10 duration-300 ease-in-out transition-all"
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="" />
                    <h5 className="text-xs">Add</h5>
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition in={copy} classNames={styles} timeout={500} unmountOnExit>
        <div className="fixed top-10 lg:right-[40%] z-50 bg-slate-200/5 backdrop-blur-lg p-4 rounded-md flex items-center justify-center">
          <h5 className="flex items-center gap-4 text-center font-bold">
            <FontAwesomeIcon className="text-green-500" icon={faCheckCircle} />
            <h5>Copied to Clipboard</h5>
          </h5>
        </div>
      </CSSTransition>
    </>
  );
};

export default Dashboard;
