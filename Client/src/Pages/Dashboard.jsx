import React, { useEffect, useState } from "react";
import Sidenav from "../Components/Sidenav";
import {
  faArrowRight,
  faCopy,
  faEllipsis,
  faEye,
  faEyeSlash,
  faLink,
  faLock,
  faMagnifyingGlass,
  faPlay,
  faPlus,
  faTimes,
  faTimesCircle,
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
        const response = await axios.get(`${apiUrl}/apps`);
        setApps(response.data);
      } catch (error) {
        console.error("Error fetching apps:", error);
      }
    };

    fetchApps();
  }, [apiUrl]);

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
    selectedApp?.password || ""
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
    };

    try {
      const response = await axios.post(`${apiUrl}/create-app`, newApp);
      setApps([...apps, response.data]);
      setAdd(false);
      setSuccess(response.data.message);
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
      resetForm();
      window.location.reload();
    } catch (error) {
      console.error("Error adding new application:", error);
      setError(error);
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

  const handleSaveApp = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/update-app/${selectedApp._id}`,
        selectedApp
      );
      setApps(
        apps.map((app) => (app._id === selectedApp._id ? response.data : app))
      );
      setPopup(false);
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  const handleDeleteApp = async () => {
    try {
      await axios.delete(`${apiUrl}/delete-app/${selectedApp._id}`);
      setApps(apps.filter((app) => app._id !== selectedApp._id));
      setPopup(false);
    } catch (error) {
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
      <Sidenav />
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
          {apps
            .filter((app) =>
              (app.name?.toLowerCase() || "").includes(search.toLowerCase())
            )
            .map((app, index) => (
              <span
                key={index}
                onClick={() => handleAppClick(app)}
                className="flex gap-4 bg-slate-200/5 hover:bg-slate-200/20 cursor-pointer transition-all ease-in-out duration-200 p-2 backdrop-blur-lg items-center justify-between rounded-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={getDefaultImage(app.appName)}
                    className="w-[40px]"
                  />
                  <div>
                    <h5>{app.appName}</h5>
                    <small className="text-xs text-slate-500">
                      {app.appEmail}
                    </small>
                  </div>
                </div>
              </span>
            ))}
          <span
            onClick={() => setAdd(true)}
            className="flex gap-4 bg-slate-200/5 hover:bg-slate-200/20 cursor-pointer transition-all ease-in-out duration-200 p-2 backdrop-blur-lg items-center justify-between rounded-md"
          >
            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faPlus} />
              <h5>Add More</h5>
            </div>
          </span>
        </div>
      </section>

      <CSSTransition in={popup} classNames={styles} timeout={600} unmountOnExit>
        <div className="fixed h-screen w-full z-50 flex items-center justify-center top-0 right-0 bg-slate-200/5 backdrop-blur-xl">
          <FontAwesomeIcon
            icon={faTimes}
            className="fixed top-10 right-10 text-xl cursor-pointer"
            onClick={() => setPopup(false)}
          />
          {selectedApp && (
            <div className="bg-slate-900 p-12 rounded-md w-[90%] lg:w-[60%]">
              <div className="flex justify-center items-center flex-col">
                <img
                  src={getDefaultImage(selectedApp.appName)}
                  className="w-[40px]"
                />
                <div>
                  <h5 className="text-xl font-bold">{selectedApp.appName}</h5>
                </div>
              </div>
              <div className="flex flex-col gap-4 items-start mt-6">
                <label>Email Address</label>
                <span className="flex items-center bg-slate-200/20 w-full gap-2 rounded-md p-2">
                  <FontAwesomeIcon icon={faUser} />
                  <input
                    type="email"
                    name="email"
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
                    name="password"
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
                    name="url"
                    value={selectedApp.appUrl}
                    onChange={handleUpdateApp}
                    className="bg-transparent text-white font-light text-xs w-full outline-none"
                  />
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() => handleCopy(selectedApp.url)}
                  />
                </span>
                <div className="flex gap-4">
                  <button
                    onClick={handleSaveApp}
                    className="flex items-center gap-2 border rounded-md py-2 px-6 hover:bg-slate-200/10 duration-300 ease-in-out transition-all"
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="" />
                    <h5 className="text-xs">Save</h5>
                  </button>
                  <button
                    onClick={handleDeleteApp}
                    className="flex items-center gap-2 border rounded-md py-2 px-6 hover:bg-red-600 duration-300 ease-in-out transition-all text-red-600"
                  >
                    <FontAwesomeIcon icon={faTimes} className="" />
                    <h5 className="text-xs">Delete</h5>
                  </button>
                </div>
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
