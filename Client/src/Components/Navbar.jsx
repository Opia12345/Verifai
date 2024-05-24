import {
  faBarsStaggered,
  faTimes,
  faUserAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const navRef = useRef(null);
  const mobileNav = useRef(null);

  const sections = ["home", "resources", "pricing", "partners", "nothing"];

  const styles = {
    enter: "transform -translate-x-full opacity-0",
    enterActive:
      "transform translate-x-0 opacity-100 transition-all duration-500 ease-in-out",
    exitActive:
      "transform -translate-x-full opacity-0 transition-all duration-500 ease-in-out",
  };

  const handleNavLinkClick = (section) => {
    setActiveLink(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setShowNav(false);
    }
  };

  const handleScrollTo = () => {
    const scrollPosition = window.scrollY;
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element && element.offsetTop <= scrollPosition + 100) {
        setActiveLink(section);
        if (section === "nothing") {
          setActiveLink(null);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollTo);
    return () => {
      window.removeEventListener("scroll", handleScrollTo);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navRef.current.classList.add(
          "backdrop-blur-2xl",
          "bg-slate-900/10",
          "transition",
          "duration-300",
          "ease-in"
        );
      } else {
        navRef.current.classList.remove(
          "backdrop-blur-2xl",
          "bg-slate-900/10",
          "transition",
          "duration-300",
          "ease-in"
        );
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileNav.current && !mobileNav.current.contains(event.target)) {
        setShowNav(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileNav]);

  const checkNavVisibility = (event) => {
    if (mobileNav.current && !mobileNav.current.contains(event.target)) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="p-4 fixed w-full inset-x-0 top-0 z-50 flex justify-around"
      >
        <span className="flex items-center space-x-3">
          <img
            onClick={() => handleNavLinkClick("home")}
            className={`w-[40px] cursor-pointer ${
              activeLink === "home" ? "underline" : "text-slate-200/40"
            }`}
            src="logo.png"
            alt=""
          />
        </span>

        <span className="items-center space-x-3 md:flex hidden">
          <h5
            onClick={() => handleNavLinkClick("resources")}
            className={`cursor-pointer hover:text-white transition ease-in duration-300 ${
              activeLink === "resources" ? "underline" : "text-slate-400"
            }`}
          >
            Resources
          </h5>
          <h5
            onClick={() => handleNavLinkClick("pricing")}
            className={`cursor-pointer hover:text-white transition ease-in duration-300 ${
              activeLink === "pricing" ? "underline" : "text-slate-400"
            }`}
          >
            Pricing
          </h5>
          <h5
            onClick={() => handleNavLinkClick("partners")}
            className={`cursor-pointer hover:text-white transition ease-in duration-300 ${
              activeLink === "partners" ? "underline" : "text-slate-400"
            }`}
          >
            Partners
          </h5>
        </span>

        <span className="flex items-center gap-4">
          <button className="flex cursor-pointer items-center hover:bg-transparent text-black py-2 px-6">
            Login
          </button>
          <button className="flex cursor-pointer items-center hover:bg-transparent text-white hover:text-black border transition-all ease-in duration-300 bg-black py-2 px-6 rounded-3xl">
            SignUp
          </button>
        </span>

        <button
          className="md:hidden block cursor-pointer"
          onClick={checkNavVisibility}
        >
          <FontAwesomeIcon
            icon={showNav ? faTimes : faBarsStaggered}
            className="text-2xl"
          />
        </button>
      </nav>

      <CSSTransition
        classNames={styles}
        in={showNav}
        timeout={700}
        unmountOnExit
      >
        <div
          ref={mobileNav}
          className="bg-slate-900/10 fixed z-40 top-0 w-[80%] h-full items-center flex p-8 backdrop-blur-2xl"
        >
          <span className="items-start flex flex-col space-y-6">
            <h5
              onClick={() => handleNavLinkClick("resources")}
              className={`cursor-pointer hover:text-white transition ease-in duration-300 ${
                activeLink === "resources" ? "underline" : "text-slate-400"
              }`}
            >
              Resources
            </h5>
            <h5
              onClick={() => handleNavLinkClick("pricing")}
              className={`cursor-pointer hover:text-white transition ease-in duration-300 ${
                activeLink === "pricing" ? "underline" : "text-slate-400"
              }`}
            >
              Pricing
            </h5>
            <h5
              onClick={() => handleNavLinkClick("partners")}
              className={`cursor-pointer hover:text-white transition ease-in duration-300 ${
                activeLink === "partners" ? "underline" : "text-slate-400"
              }`}
            >
              Partners
            </h5>
            <button className=" flex cursor-pointer items-center hover:bg-transparent text-white hover:text-black border transition ease-in duration-300 border-teal-700 bg-teal-700 py-2 px-6 rounded-md">
              <FontAwesomeIcon icon={faUserAlt} /> &nbsp; Register
            </button>
          </span>
        </div>
      </CSSTransition>
    </>
  );
};

export default Navbar;
