import React, { useState, useEffect } from "react";
import { faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import { getApiUrl } from "../config";
import axios from "axios";

const EmailConfirmation = () => {
  const [seconds, setSeconds] = useState(59);
  const [countdownComplete, setCountdownComplete] = useState(false);
  const [err, setErr] = useState(false);
  const apiUrl = getApiUrl(process.env.NODE_ENV);
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(intervalId);
          setCountdownComplete(true);
          return 0;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const styles = {
    enter: "transform translate-x-full opacity-0",
    enterActive:
      "transform -translate-x-0 opacity-100 transition-all duration-500 ease-in-out",
    exitActive:
      "transform translate-x-full opacity-0 transition-all duration-500 ease-in-out",
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const handleResendEmail = () => {
    setSeconds(59);
    setCountdownComplete(false);
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(intervalId);
          setCountdownComplete(true);
          return 0;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    axios
      .post(`${apiUrl}/resend-verification/${userId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setErr(null);
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

  return (
    <>
      <CSSTransition in={err} classNames={styles} timeout={500} unmountOnExit>
        <div className="fixed top-10 right-1/2 transform translate-x-1/2 z-50 bg-red-500/80 text-white p-4 rounded-md flex items-center justify-center shadow-lg">
          <h5 className="flex items-center gap-2 font-bold">
            <FontAwesomeIcon icon={faTimesCircle} />
            <span>{err}</span>
          </h5>
        </div>
      </CSSTransition>

      <section className="flex justify-center flex-col h-screen w-screen p-8 items-center">
        <img src="/confirm.svg" className="lg:w-[30%]" alt="" />
        <h4 className="text-lg text-center">
          We've sent a verification link to your email address. Please check{" "}
          <br />
          your inbox and spam folder. Click on the link to verify your email and{" "}
          <br />
          complete the registration process.
        </h4>
        <div className="flex flex-col items-center mt-8 gap-4">
          <small>Didn't receive an email?</small>
          {countdownComplete && (
            <button
              className="border rounded-md py-2 px-6"
              onClick={handleResendEmail}
            >
              <FontAwesomeIcon icon={faPaperPlane} /> &nbsp; Resend Email
            </button>
          )}
          {!countdownComplete && (
            <p>
              Resend Email in {formatTime(Math.floor(seconds / 60))}:
              {formatTime(seconds % 60)}
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default EmailConfirmation;
