import {
  faArrowRight,
  faChalkboardTeacher,
  faKey,
  faQrcode,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignOptions = () => {
  return (
    <>
      <section className="bg-[url(/bg.jpg)] flex justify-center flex-col items-center bg-cover w-full bg-black/60 bg-blend-darken h-screen bg-center">
        <div className="flex flex-col text-center p-8 rounded-lg justify-center gap-4 frm">
          <h2 className="flex justify-center font-bold">
            What is your preferred Authentication Method?
          </h2>
          <span className="grid lg:grid-cols-2 gap-4 md:grid-cols-1 mt-4 items-center">
            <Link to="/otpOne">
              <div className="flex relative flex-col p-8 bod border hover:border-blue-600 cursor-pointer rounded-lg">
                <FontAwesomeIcon className="text-6xl" icon={faKey} />
                <h5 className="font-bold mt-4">OTP</h5>
                <div className="features-row-border w-full h-[1px] mt-4 mb-4"></div>
              </div>
            </Link>
            <Link to="/qrOne">
              <div className="flex relative flex-col p-8 bod border cursor-pointer hover:border-blue-600  rounded-lg">
                <FontAwesomeIcon className="text-6xl" icon={faQrcode} />
                <h5 className="font-bold mt-4">QR-Code</h5>
                <div className="features-row-border w-full h-[1px] mt-4 mb-4"></div>
              </div>
            </Link>
          </span>
        </div>
      </section>
    </>
  );
};

export default SignOptions;
