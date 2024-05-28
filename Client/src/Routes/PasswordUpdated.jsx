import React, { useState, useEffect } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const PasswordUpdated = () => {
  return (
    <>
      <section className="flex justify-center flex-col h-screen w-screen p-8 items-center">
        <img src="/confirm.svg" className="lg:w-[30%]" alt="" />
        <h4 className="text-lg text-center">
          Your password has been successfully updated. Please log in with your
          <br />
          new password to continue.
        </h4>
        <Link to="/signin">
          <button className="cursor-pointer mt-4 items-center hover:bg-transparent border transition ease-in duration-300 border-teal-700 bg-teal-700 py-2 px-6 rounded-md">
            <FontAwesomeIcon icon={faArrowRight} /> &nbsp; Login
          </button>
        </Link>
      </section>
    </>
  );
};

export default PasswordUpdated;
