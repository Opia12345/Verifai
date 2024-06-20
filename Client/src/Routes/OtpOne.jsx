import React, { useState } from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEnvelope,
  faEye,
  faEyeSlash,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { getApiUrl } from "../config";
import axios from "axios";

const OtpOne = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const apiUrl = getApiUrl(process.env.NODE_ENV);
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  const initialValues = {
    Email: "",
  };

  const styles = {
    enter: "transform translate-x-full opacity-0",
    enterActive:
      "transform -translate-x-0 opacity-100 transition-all duration-500 ease-in-out",
    exitActive:
      "transform translate-x-full opacity-0 transition-all duration-500 ease-in-out",
  };

  const Validation = yup.object().shape({
    Email: yup
      .string()
      .email("Please use a valid email address")
      .required("Email is required"),
  });

  const submitForm = (values, { resetForm }) => {
    setIsSubmitting(true);
    axios
      .post(`${apiUrl}/auth-otp`, values)
      .then((response) => {
        setErr(null);
        setIsSubmitting(false);
        navigate(`/otpTwo`);
        resetForm();
      })
      .catch((err) => {
        if (err.response) {
          setErr(err.response.data.errors);
          setTimeout(() => {
            setErr(false);
          }, 3000);
          setIsSubmitting(false);
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

      <section className="bg-[url(/bg.jpg)] flex justify-center flex-col items-center bg-cover w-full bg-black/60 bg-blend-darken h-screen bg-center">
        <div className="bg-gray-500/10 border-[0.1px] backdrop-blur-lg p-8 rounded-lg shadow-xl w-full max-w-md">
          <Formik
            initialValues={initialValues}
            validationSchema={Validation}
            onSubmit={submitForm}
          >
            <Form
              className="flex flex-col text-center p-8 rounded-lg justify-center gap-4 frm"
              id="emailForm"
            >
              <h2 className="flex justify-center text-3xl font-bold">
                Get Your Otp Via Email
              </h2>
              <h5 className="flex text-center justify-center text-lg text-slate-400">
                Input your email address.
              </h5>

              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <Field
                  type="text"
                  name="Email"
                  placeholder="Email"
                  className="pl-10 pr-3 py-2 border text-black border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="Email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className={`py-2 rounded-md text-white font-bold transition ${
                  isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                ) : (
                  <>
                    Continue &nbsp;
                    <FontAwesomeIcon icon={faArrowRight} />
                  </>
                )}
              </button>
            </Form>
          </Formik>
        </div>
      </section>
    </>
  );
};

export default OtpOne;
