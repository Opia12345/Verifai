import { faKeybase, faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faQuestionCircle, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBarsStaggered,
  faChevronDown,
  faChevronUp,
  faCircleQuestion,
  faGear,
  faKey,
  faLock,
  faQuestion,
  faSign,
  faSignOut,
  faTimes,
  faTimesCircle,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Sidenav = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [profile, setProfile] = useState(false);
  const [logOut, setLogout] = useState(false);
  const [err, setErr] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    axios
      .post(`${apiUrl}/logout`)
      .then((response) => {
        setErr(null);
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
        navigate("/user/login");
      })
      .catch((err) => {
        if (err.response) {
          setErr(err.response.data.error);
          setTimeout(() => {
            setErr(false);
          }, 3000);
        }
      });
  };

  const handleProfile = () => {
    setProfile(!profile);
    setTimeout(() => {
      setProfile(false);
    }, 6000);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMobileNav(false);
  };

  const styles = {
    enter: "transform translate-x-full opacity-0",
    enterActive:
      "transform -translate-x-0 opacity-100 transition-all duration-500 ease-in-out",
    exitActive:
      "transform translate-x-full opacity-0 transition-all duration-500 ease-in-out",
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
      <CSSTransition
        in={logOut}
        timeout={500}
        classNames={styles}
        unmountOnExit
      >
        <div className="flex justify-center items-center z-50 w-full h-full bg-slate-200/20 backdrop-blur-md fixed bottom-0 right-0">
          <div className="flex items-center flex-col justify-center space-x-4 max-w-[400px] px-4 py-2 rounded-md h-[40px]">
            <small className="font-semibold text-xl text-center">
              Are you sure you want to log out? You will have to log back in.
            </small>
            <span className="space-x-4 mt-4">
              <button
                onClick={handleLogOut}
                className="bg-red-700 w-auto px-6 py-2 hover:bg-red-900 transition ease-in duration-200 rounded-md"
              >
                <FontAwesomeIcon icon={faSignOut} />
                &nbsp; Log Out
              </button>
              <button
                onClick={() => setLogout(false)}
                className="px-6 py-2 hover:bg-slate-200/20 transition ease-in duration-200 border rounded-md"
              >
                Cancel
              </button>
            </span>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition in={err} classNames={styles} timeout={500} unmountOnExit>
        <div className="flex justify-center fixed bottom-10 right-10">
          <div className="flex items-center justify-center space-x-4 bg-red-700/30 w-auto px-4 py-2 rounded-md h-[40px]">
            <FontAwesomeIcon icon={faTimesCircle} />
            <small className="font-semibold">{err}</small>
          </div>
        </div>
      </CSSTransition>

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

              <Link to="/courses">
                <span
                  className={`cursor-pointer p-2 ${
                    activeLink === "/courses" ? "text-blue-600 " : ""
                  } hover:bg-slate-200/5 transition ease-in-out duration-300 flex items-center gap-4`}
                >
                  <FontAwesomeIcon icon={faKey} />
                  <h5>Generator</h5>
                </span>
              </Link>

              <Link to="/quiz">
                <span
                  className={`cursor-pointer p-2 ${
                    activeLink === "/quiz" ? "text-blue-600 " : ""
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
              <Link to="/help">
                <span
                  className={`cursor-pointer p-2 ${
                    activeLink === "/help" ? "text-blue-600 " : ""
                  } hover:bg-slate-200/5 transition ease-in-out duration-300 flex items-center gap-4`}
                >
                  <FontAwesomeIcon icon={faUserAlt} className="text-lg" />
                  <h5>UserName</h5>
                </span>
              </Link>
              {profile && (
                <div className="fixed z-20 left-20 top-40 bg-slate-200/20 backdrop-blur-md rounded-md border px-10 py-4">
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <FontAwesomeIcon className="text-3xl" icon={faUserAlt} />
                    <h5>userEmail</h5>
                    <small className="text-slate-400">Free Account</small>
                    <button
                      onClick={() => setLogout(true)}
                      className="bg-purple-700 px-6 py-1 rounded-md"
                    >
                      <FontAwesomeIcon icon={faSignOut} />
                      &nbsp; Log Out
                    </button>
                  </div>
                </div>
              )}
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

              <Link to="/courses">
                <span
                  className={`cursor-pointer p-2 ${
                    activeLink === "/courses" ? "text-blue-600 " : ""
                  } hover:bg-slate-200/5 transition ease-in-out duration-300 flex items-center gap-4`}
                >
                  <FontAwesomeIcon icon={faKey} />
                  <h5>Generator</h5>
                </span>
              </Link>

              <Link to="/quiz">
                <span
                  className={`cursor-pointer p-2 ${
                    activeLink === "/quiz" ? "text-blue-600 " : ""
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
              <Link to="/help">
                <span
                  className={`cursor-pointer p-2 ${
                    activeLink === "/help" ? "text-blue-600 " : ""
                  } hover:bg-slate-200/5 transition ease-in-out duration-300 flex items-center gap-4`}
                >
                  <FontAwesomeIcon icon={faUserAlt} className="text-lg" />
                  <h5>UserName</h5>
                </span>
              </Link>
              {profile && (
                <div className="fixed z-20 left-20 top-40 bg-slate-200/20 backdrop-blur-md rounded-md border px-10 py-4">
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <FontAwesomeIcon className="text-3xl" icon={faUserAlt} />
                    <h5>userEmail</h5>
                    <small className="text-slate-400">Free Account</small>
                    <button
                      onClick={() => setLogout(true)}
                      className="bg-purple-700 px-6 py-1 rounded-md"
                    >
                      <FontAwesomeIcon icon={faSignOut} />
                      &nbsp; Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </>
      </CSSTransition>
    </>
  );
};

export default Sidenav;
