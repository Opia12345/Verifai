import React, { useState, useEffect, useCallback } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";

const QrTwo = () => {
  const [scanResult, setScanResult] = useState(null);
  const url = "https://apple.com";

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
      if (result === url) {
        window.location.href = result;
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

      <div
        id="reader"
        className="flex justify-center items-center bg-slate-200/20 p-4"
        style={{
          border: "1px dashed white",
          padding: "20px",
          margin: "20px",
          width: "60%",
          borderRadius: "10px",
        }}
      ></div>
    </section>
  );
};

export default QrTwo;
