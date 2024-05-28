import {
  faBarsStaggered,
  faCircleQuestion,
  faGear,
  faKey,
  faLock,
  faTimes,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";

const Sidenav = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const { username } = useUserContext();

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMobileNav(false);
  };

  const styles2 = {
    enter: "transform -translate-x-full opacity-0",
    enterActive:
      "transform translate-x-0 opacity-100 transition-all duration-500 ease-in-out",
    exitActive:
      "transform -translate-x-full opacity-0 transition-all duration-500 ease-in-out",
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 1024);
    };
    handleResize(); // Set the initial value
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!mobile && (
        <>
          <nav className="w-[250px] text-white h-screen py-10 bg-slate-200/5 backdrop-blur-md z-50 fixed left-0 top-0 p-8 flex flex-col justify-center">
            <div className="">
              <NavLink to="/dashboard" onClick={() => handleLinkClick("/")}>
                <span
                  className={`cursor-pointer p-2 ${
                    activeLink === "/dashboard" ? "text-blue-600 " : ""
                  } hover:bg-slate-200/5 transition ease-in-out duration-300 flex items-center gap-4`}
                >
                  <FontAwesomeIcon icon={faLock} />
                  <h5>Passwords</h5>
                </span>
              </NavLink>

              <Link to="/generator">
                <span
                  className={`cursor-pointer p-2 ${
                    activeLink === "/generator" ? "text-blue-600 " : ""
                  } hover:bg-slate-200/5 transition ease-in-out duration-300 flex items-center gap-4`}
                >
                  <FontAwesomeIcon icon={faKey} />
                  <h5>Generator</h5>
                </span>
              </Link>

              <Link to="/settings">
                <span
                  className={`cursor-pointer p-2 ${
                    activeLink === "/settings" ? "text-blue-600 " : ""
                  } hover:bg-slate-200/5 transition ease-in-out duration-300 flex items-center gap-4`}
                >
                  <FontAwesomeIcon icon={faGear} />
                  <h5>Settings</h5>
                </span>
              </Link>

              <Link to="/help">
                <span
                  className={`cursor-pointer p-2 ${
                    activeLink === "/help" ? "text-blue-600 " : ""
                  } hover:bg-slate-200/5 transition ease-in-out duration-300 flex items-center gap-4`}
                >
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    className="text-lg"
                  />
                  <h5>Help</h5>
                </span>
              </Link>
              <span className="bg-slate-200/20 ease-in-out duration-300 flex p-2 justify-between rounded-md items-center gap-2">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={faUserAlt}
                    className="text-lg text-blue-600"
                  />
                  <h5 className="trunc">{username}</h5>
                </div>
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </span>
            </div>
          </nav>
        </>
      )}

      {mobile && (
        <>
          <span className="flex text-white p-6 items-center">
            <FontAwesomeIcon
              className="text-xl cursor-pointer"
              onClick={() => setMobileNav(true)}
              icon={faBarsStaggered}
            />
          </span>
        </>
      )}

      <CSSTransition
        in={mobileNav}
        timeout={500}
        classNames={styles2}
        unmountOnExit
      >
        <>
          <nav className="w-full h-screen bg-slate-200/5 text-white backdrop-blur-md z-50 overflow-y-scroll p-4 fixed left-0 top-0 flex flex-col justify-center">
            <FontAwesomeIcon
              className="fixed top-10 right-10 text-white cursor-pointer"
              onClick={() => setMobileNav(false)}
              icon={faTimes}
            />
            <div className="">
              <NavLink to="/dashboard" onClick={() => handleLinkClick("/")}>
                <span
                  className={`cursor-pointer p-2 ${
                    activeLink === "/dashboard" ? "text-blue-600 " : ""
                  } hover:bg-slate-200/5 transition ease-in-out duration-300 flex items-center gap-4`}
                >
                  <FontAwesomeIcon icon={faLock} />
                  <h5>Passwords</h5>
                </span>
              </NavLink>

              <Link to="/generator">
                <span
                  className={`cursor-pointer p-2 ${
                    activeLink === "/generator" ? "text-blue-600 " : ""
                  } hover:bg-slate-200/5 transition ease-in-out duration-300 flex items-center gap-4`}
                >
                  <FontAwesomeIcon icon={faKey} />
                  <h5>Generator</h5>
                </span>
              </Link>

              <Link to="/settings">
                <span
                  className={`cursor-pointer p-2 ${
                    activeLink === "/settings" ? "text-blue-600 " : ""
                  } hover:bg-slate-200/5 transition ease-in-out duration-300 flex items-center gap-4`}
                >
                  <FontAwesomeIcon icon={faGear} />
                  <h5>Settings</h5>
                </span>
              </Link>

              <Link to="/help">
                <span
                  className={`cursor-pointer p-2 ${
                    activeLink === "/help" ? "text-blue-600 " : ""
                  } hover:bg-slate-200/5 transition ease-in-out duration-300 flex items-center gap-4`}
                >
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    className="text-lg"
                  />
                  <h5>Help</h5>
                </span>
              </Link>
              <span className="bg-slate-200/20 ease-in-out duration-300 flex p-2 justify-between rounded-md items-center gap-2">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={faUserAlt}
                    className="text-lg text-blue-600"
                  />
                  <h5 className="trunc">{username}</h5>
                </div>
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </span>
            </div>
          </nav>
        </>
      </CSSTransition>
    </>
  );
};

export default Sidenav;
