import React, { useState } from "react";
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
  faPlus,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [popup, setPopup] = useState(false);
  const [add, setAdd] = useState(false);
  const [password, setPassword] = useState(false);
  const [copy, setCopy] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [apps, setApps] = useState([
    {
      name: "Apple",
      email: "personal@gmail.com",
      img: "/apple.svg",
      password: "12345",
      url: "https://apple.com",
    },
    {
      name: "Facebook",
      email: "personal@gmail.com",
      img: "/fb.svg",
      password: "12345",
      url: "https://facebook.com",
    },
    {
      name: "Instagram",
      email: "personal@gmail.com",
      img: "/ig.svg",
      password: "12345",
      url: "https://instagram.com",
    },
    {
      name: "X",
      email: "personal@gmail.com",
      img: "/x.svg",
      password: "12345",
      url: "https://x.com",
    },
  ]);

  const styles = {
    enter: "transform -translate-x-full opacity-0",
    enterActive:
      "transform translate-x-0 opacity-100 transition-all duration-500 ease-in-out",
    exitActive:
      "transform -translate-x-full opacity-0 transition-all duration-500 ease-in-out",
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddApp = (e) => {
    e.preventDefault();
    const { name, email, password, url } = e.target.elements;
    const newApp = {
      name: name.value,
      email: email.value,
      img: "/default.png",
      password: password.value,
      url: url.value,
    };
    setApps([...apps, newApp]);
    setAdd(false);
  };

  const handleAppClick = (app) => {
    setSelectedApp(app);
    setPopup(true);
  };

  const handleUpdateApp = (e) => {
    const { name, value } = e.target;
    setSelectedApp({ ...selectedApp, [name]: value });
  };

  const handleSaveApp = () => {
    setApps(
      apps.map((app) => (app.name === selectedApp.name ? selectedApp : app))
    );
    setPopup(false);
  };

  const handleDeleteApp = () => {
    setApps(apps.filter((app) => app.name !== selectedApp.name));
    setPopup(false);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  return (
    <>
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
              app.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((app, index) => (
              <span
                key={index}
                onClick={() => handleAppClick(app)}
                className="flex gap-4 bg-slate-200/5 hover:bg-slate-200/20 cursor-pointer transition-all ease-in-out duration-200 p-2 backdrop-blur-lg items-center justify-between rounded-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={app.img}
                    className="w-[40px]"
                    onError={(e) => (e.target.src = "/default.png")}
                  />
                  <div>
                    <h5>{app.name}</h5>
                    <small className="text-xs text-slate-500">
                      {app.email}
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
            <div className="bg-slate-900 p-12 rounded-md lg:w-[60%]">
              <div className="flex justify-center items-center flex-col">
                <img src={selectedApp.img} className="w-[40px]" />
                <div>
                  <h5 className="text-xl font-bold">{selectedApp.name}</h5>
                </div>
              </div>
              <div className="flex flex-col gap-4 items-start mt-6">
                <label>Email Address</label>
                <span className="flex items-center bg-slate-200/20 w-full gap-2 rounded-md p-2">
                  <FontAwesomeIcon icon={faUser} />
                  <input
                    type="email"
                    name="email"
                    value={selectedApp.email}
                    onChange={handleUpdateApp}
                    className="bg-transparent text-white font-light text-xs w-full outline-none"
                  />
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() => handleCopy(selectedApp.email)}
                  />
                </span>

                <label>Password</label>
                <span className="flex items-center bg-slate-200/20 w-full gap-2 rounded-md p-2">
                  <FontAwesomeIcon icon={faLock} />
                  <input
                    type={password ? "text" : "password"}
                    name="password"
                    value={selectedApp.password}
                    onChange={handleUpdateApp}
                    className="bg-transparent text-white font-light text-xs w-full outline-none"
                  />
                  <FontAwesomeIcon
                    icon={password ? faEye : faEyeSlash}
                    onClick={() => setPassword(!password)}
                  />
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() => handleCopy(selectedApp.password)}
                  />
                </span>

                <label>URL</label>
                <span className="flex items-center bg-slate-200/20 w-full gap-2 rounded-md p-2">
                  <FontAwesomeIcon icon={faLink} />
                  <input
                    type="text"
                    name="url"
                    value={selectedApp.url}
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
          <div className="bg-slate-900 p-12 rounded-md lg:w-[60%]">
            <h5 className="text-xl text-center font-bold">Add Application</h5>
            <form
              className="flex flex-col gap-4 items-start mt-6"
              onSubmit={handleAddApp}
            >
              <label>Application Name</label>
              <input
                name="name"
                type="text"
                placeholder="Application Name"
                className="bg-slate-200/20 text-white font-light text-xs w-full outline-none rounded-md p-2"
              />
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className="bg-slate-200/20 text-white font-light text-xs w-full outline-none rounded-md p-2"
              />
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="bg-slate-200/20 text-white font-light text-xs w-full outline-none rounded-md p-2"
              />
              <label>URL</label>
              <input
                name="url"
                type="text"
                placeholder="URL"
                className="bg-slate-200/20 text-white font-light text-xs w-full outline-none rounded-md p-2"
              />
              <button
                type="submit"
                className="flex items-center gap-2 border rounded-md py-2 px-6 hover:bg-slate-200/10 duration-300 ease-in-out transition-all"
              >
                <FontAwesomeIcon icon={faArrowRight} className="" />
                <h5 className="text-xs">Add</h5>
              </button>
            </form>
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
