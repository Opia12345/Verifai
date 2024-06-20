import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";

const QrTwo = () => {
  const [scanResult, setScanResult] = useState(null);
  const [err, setErr] = useState(false);
  const redirect = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 2,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);
      const storedQrCodeValue = localStorage.getItem("qrCodeValue");
      if (result === storedQrCodeValue) {
        setScanResult(true);
        setTimeout(() => {
          setScanResult(false);
        }, 3000);
        redirect("/dashboard");
        localStorage.removeItem("qrCodeValue");
      } else {
        setErr(true);
        setTimeout(() => {
          setErr(false);
        }, 4000);
        redirect("/qrOne")
        localStorage.removeItem("qrCodeValue");
      }
    }

    function error() {
      console.log(err);
    }
  }, []);

  const styles = {
    enter: "transform -translate-x-full opacity-0",
    enterActive:
      "transform translate-x-0 opacity-100 transition-all duration-500 ease-in-out",
    exitActive:
      "transform -translate-x-full opacity-0 transition-all duration-500 ease-in-out",
  };

  return (
    <section className="bg-[url(/bg.jpg)] flex justify-center flex-col items-center bg-cover w-full bg-black/60 bg-blend-darken h-screen bg-center">
      <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>
      <CSSTransition
        in={scanResult}
        classNames={styles}
        timeout={500}
        unmountOnExit
      >
        <div className="fixed top-0 h-screen w-full flex items-center justify-center  bg-slate-200/5 backdrop-blur-lg right-0 z-50">
          <div className="p-4 rounded-md flex items-center flex-col gap-4 text-center font-bold">
            <FontAwesomeIcon
              className="text-green-500 text-3xl"
              icon={faCheckCircle}
            />
            <h5 className="text-2xl">Verified!</h5>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition in={err} classNames={styles} timeout={500} unmountOnExit>
        <div className="fixed top-10 lg:right-[30%] z-50 bg-slate-200/5 backdrop-blur-lg p-4 rounded-md flex items-center justify-center">
          <h5 className="flex items-center gap-4 text-center font-bold">
            <FontAwesomeIcon className="text-red-500" icon={faTimesCircle} />
            <small>
              The provided QR Code does not seem to be valid. Please repeat the
              process.
            </small>
          </h5>
        </div>
      </CSSTransition>

      <div
        id="reader"
        className="flex justify-center items-center bg-slate-200/20 p-8"
        style={{
          border: "1px dashed white",
          padding: "20px",
          margin: "20px",
          width: "400px",
          borderRadius: "10px",
        }}
      ></div>
    </section>
  );
};

export default QrTwo;
