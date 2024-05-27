import React, { useState } from "react";
import Sidenav from "../Components/Sidenav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faMagnifyingGlass,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import { faCopy, faCheckCircle } from "@fortawesome/free-regular-svg-icons";

const generatePassword = (length = 12) => {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()-_+=~`[]{}|;:,.<>?";

  const allChars = lowercaseChars + uppercaseChars + numberChars + symbolChars;

  // Ensure inclusion of at least one character from each required set
  let password = "";
  password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
  password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
  password += numberChars[Math.floor(Math.random() * numberChars.length)];
  password += symbolChars[Math.floor(Math.random() * symbolChars.length)];

  // Generate the remaining characters randomly from all character sets
  for (let i = 4; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  // Shuffle the password to ensure randomness
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
};

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
    setShowPassword(true);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  const styles = {
    enter: "transform -translate-x-full opacity-0",
    enterActive:
      "transform translate-x-0 opacity-100 transition-all duration-500 ease-in-out",
    exitActive:
      "transform -translate-x-full opacity-0 transition-all duration-500 ease-in-out",
  };

  return (
    <>
      <Sidenav />
      <div className="lg:ml-[250px] lg:p-8 p-4 h-screen">
        <h1 className="font-bold text-3xl">Password Generator</h1>
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleGeneratePassword}
            className="px-6 py-2 border hover:bg-slate-200/20 transition-all ease-in-out duration-300 text-white rounded-md mt-2"
          >
            Generate Password
          </button>
        </div>

        <CSSTransition
          in={showPassword}
          classNames={styles}
          timeout={500}
          unmountOnExit
        >
          <div className="fixed h-screen w-full z-50 flex items-center flex-col justify-center top-0 right-0 bg-red-200/5 backdrop-blur-xl">
            <FontAwesomeIcon
              icon={faTimes}
              className="text-lg fixed top-10 right-10 cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
            <h1 className="text-xl font-bold">Generated Password</h1>
            <span className="bg-slate-200/20 px-4 py-2 mt-4 w-1/2 flex items-center justify-between">
              <h5>{password}</h5>
              <FontAwesomeIcon
                className="cursor-pointer"
                onClick={() => handleCopy(password)}
                icon={faCopy}
              />
            </span>
          </div>
        </CSSTransition>
      </div>

      <CSSTransition in={copy} classNames={styles} timeout={500} unmountOnExit>
        <div className="fixed top-10 lg:right-[40%] z-50 bg-slate-200/5 backdrop-blur-lg p-4 rounded-md flex items-center justify-center">
          <h5 className="flex items-center gap-4 text-center font-bold">
            <FontAwesomeIcon className="text-green-500" icon={faCheckCircle} />
            <span>Copied to Clipboard</span>
          </h5>
        </div>
      </CSSTransition>
    </>
  );
};

export default PasswordGenerator;
