import React from "react";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Fallback = () => {
  return (
    <>
      <section className="flex justify-center flex-col h-screen p-8 w-screen items-center">
        <img src="/fail.svg" className="lg:w-[30%]" alt="" />
        <h4 className="text-lg text-center">
          Unauthorized access. Please log in to continue.
        </h4>
        <div className="flex flex-col items-center mt-8 gap-4">
          <Link to="/signin">
            <button className="cursor-pointer items-center flex hover:bg-transparent transition ease-in duration-300 border py-2 px-6 rounded-md">
              <FontAwesomeIcon icon={faUser} /> &nbsp; Login
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Fallback;
