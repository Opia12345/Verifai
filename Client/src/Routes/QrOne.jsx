import React, { useRef, useState } from "react";
import QRCode from "qrcode.react";
import * as htmlToImage from "html-to-image";
import { CSSTransition } from "react-transition-group";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const QrOne = () => {
  const qrCodeRef = useRef(null);
  const [qrIsVisible, setQrIsVisible] = useState(false);
  const [deets, setDeets] = useState(false);
  const handleQrCodeGenerator = () => {
    setQrIsVisible(true);
    setDeets(true);
  };

  const downloadQRCode = () => {
    htmlToImage
      .toPng(qrCodeRef.current)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qr-code.png";
        link.click();
      })
      .catch(function (error) {
        console.error("Error generating QR code:", error);
      });
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
      <CSSTransition in={deets} classNames={styles} timeout={500} unmountOnExit>
        <div className="fixed top-10 lg:right-[37%] right-4 z-50">
          <div className=" bg-slate-200/5 backdrop-blur-lg p-4 rounded-md flex items-center justify-center flex-col gap-4 text-center font-bold">
            <FontAwesomeIcon
              className="text-green-500"
              icon={faQuestionCircle}
            />
            <h5>Click the QR code to download it.</h5>
            <Link to="/qrTwo">
              <h5 className="underline cursor-pointer">
                Upload the downloaded document to login
              </h5>
            </Link>
          </div>
        </div>
      </CSSTransition>

      <section className="bg-[url(/bg.jpg)] flex justify-center flex-col items-center bg-cover w-full bg-black/60 bg-blend-darken h-screen bg-center">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-2xl font-bold">QR Code Generator</h1>
          <div>
            <button
              onClick={handleQrCodeGenerator}
              className="border mt-8 hover:bg-slate-200/20 transition ease-in-out duration-300 px-6 py-2 rounded-md"
            >
              Generate QR Code
            </button>
            <CSSTransition
              in={qrIsVisible}
              classNames={styles}
              timeout={600}
              unmountOnExit
            >
              <div className="fixed top-0 right-0 w-full h-screen flex items-center justify-center bg-slate-200/5 backdrop-blur-lg">
                <div className="flex flex-col items-center" ref={qrCodeRef}>
                  <QRCode
                    onClick={downloadQRCode}
                    value="https://thevault-ae9i.onrender.com/dashboard"
                    size={300}
                  />
                </div>
              </div>
            </CSSTransition>
          </div>
        </div>
      </section>
    </>
  );
};

export default QrOne;
