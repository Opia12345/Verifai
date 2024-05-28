import React, { useState, useEffect } from "react";
import { faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEye,
  faEyeSlash,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";

const EmailConfirmation = () => {
  const [seconds, setSeconds] = useState(59);
  const [countdownComplete, setCountdownComplete] = useState(false);
  const [err, setErr] = useState(false);

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
        <div className="flex justify-center fixed bottom-10 right-10">
          <div className="flex items-center justify-center space-x-4 bg-red-700/30 w-auto px-4 py-2 rounded-md h-[40px]">
            <FontAwesomeIcon icon={faTimesCircle} />
            <small className="font-semibold">{err}</small>
          </div>
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
              className="border rounded-md py-2"
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
