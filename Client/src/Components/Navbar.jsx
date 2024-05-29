import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header className="flex justify-center items-center h-screen w-full bg-[url('/bg.jpg')] bg-black/60 bg-blend-darken bg-cover bg-center bg-no-repeat">
        <nav className="p-4 fixed w-full inset-x-0 top-0 z-50 flex items-center justify-around">
          <span className="flex items-center">
            <img className={`w-[70px] cursor-pointer`} src="logo.png" alt="" />
            <h5 className="font-black text-xl">The Vault</h5>
          </span>

          <NavLink to="/register">
            <button className="px-6 py-2 bg-black rounded-3xl border hover:bg-blue-700 transition-all ease-in-out duration-300">
              SignUp
            </button>
          </NavLink>
        </nav>
        <div className="text-center p-4">
          <h1 className="text-4xl font-bold mb-4">
            Safeguard Your Digital Life with Ease
          </h1>
          <h5>
            Introducing our cutting-edge password manager, the ultimate solution
            for organizing and protecting your passwords. <br /> Say goodbye to
            the hassle of remembering numerous passwords; <br /> our secure
            vault stores all your credentials in one place, accessible only to
            you.
          </h5>
          <NavLink to="/register">
            <button className="mt-4 px-6 py-2 bg-black rounded-3xl border hover:bg-blue-700 transition-all ease-in-out duration-300">
              Get Started
            </button>
          </NavLink>
        </div>
      </header>
    </>
  );
};

export default Navbar;
