import React, { useState } from "react";
import Sidenav from "../Components/Sidenav";
import {
  faArrowRight,
  faEllipsis,
  faLock,
  faMagnifyingGlass,
  faPlus,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [popup, setPopup] = useState(false);

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
          <span
            onClick={() => setPopup(true)}
            className="flex gap-4 bg-slate-200/5 hover:bg-slate-200/20 cursor-pointer transition-all ease-in-out duration-200 p-2 backdrop-blur-lg items-center justify-between rounded-md"
          >
            <div className="flex items-center gap-4">
              <img src="/apple.svg" className="w-[40px]" />
              <div>
                <h5>Apple</h5>
                <small className="text-xs text-slate-500">me22@gmail.com</small>
              </div>
            </div>
            <FontAwesomeIcon icon={faEllipsis} />
          </span>

          <span className="flex gap-4 bg-slate-200/5 hover:bg-slate-200/20 cursor-pointer transition-all ease-in-out duration-200 p-2 backdrop-blur-lg items-center justify-between rounded-md">
            <div className="flex items-center gap-4">
              <img src="/fb.svg" className="w-[40px]" />
              <div>
                <h5>Facebook</h5>
                <small className="text-xs text-slate-500">me22@gmail.com</small>
              </div>
            </div>
            <FontAwesomeIcon icon={faEllipsis} />
          </span>

          <span className="flex gap-4 bg-slate-200/5 hover:bg-slate-200/20 cursor-pointer transition-all ease-in-out duration-200 p-2 backdrop-blur-lg items-center justify-between rounded-md">
            <div className="flex items-center gap-4">
              <img src="/ig.svg" className="w-[40px]" />
              <div>
                <h5>Instagram</h5>
                <small className="text-xs text-slate-500">me22@gmail.com</small>
              </div>
            </div>
            <FontAwesomeIcon icon={faEllipsis} />
          </span>

          <span className="flex gap-4 bg-slate-200/5 hover:bg-slate-200/20 cursor-pointer transition-all ease-in-out duration-200 p-2 backdrop-blur-lg items-center justify-between rounded-md">
            <div className="flex items-center gap-4">
              <img src="/x.svg" className="w-[40px]" />
              <div>
                <h5>X</h5>
                <small className="text-xs text-slate-500">me22@gmail.com</small>
              </div>
            </div>
            <FontAwesomeIcon icon={faEllipsis} />
          </span>

          <span className="flex gap-4 bg-slate-200/5 hover:bg-slate-200/20 cursor-pointer transition-all ease-in-out duration-200 p-2 backdrop-blur-lg items-center justify-between rounded-md">
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
          <div className="bg-slate-900 p-12 rounded-md">
            <div className="flex flex-col text-center items-center gap-4">
              <img src="/apple.svg" className="w-[40px]" />
              <div>
                <h5 className="text-xl font-bold">Apple</h5>
              </div>
              <span className="flex items-center bg-slate-200/20 w-full gap-2 rounded-md p-2 mt-4">
                <FontAwesomeIcon icon={faUser} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent text-white font-light text-xs w-full outline-none"
                />
              </span>
              <span className="flex items-center bg-slate-200/20 w-full gap-2 rounded-md p-2">
                <FontAwesomeIcon icon={faLock} />
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-transparent text-white font-light text-xs w-full outline-none"
                />
              </span>
              <button className="flex items-center gap-2 border rounded-md py-2 px-6 hover:bg-slate-200/10 duration-300 ease-in-out transition-all">
                <FontAwesomeIcon icon={faArrowRight} className="" />
                <h5 className="text-xs">Save</h5>
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default Dashboard;
