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

            <span className="flex items-center bg-slate-200/20 gap-2 rounded-md p-2 mt-4">
              <FontAwesomeIcon icon={faEnvelope} />
              <Field
                type="email"
                name="Email"
                placeholder="Email Address"
                className="bg-transparent text-white font-light text-xs w-full outline-none"
              />
            </span>
            <ErrorMessage
              name="Email"
              component="div"
              className="text-red-500 text-xs flex items-center"
            />

            {isSubmitting ? (
              <button
                disabled={true}
                type="submit"
                className="border rounded-md py-2"
              >
                <div className="flex items-center justify-center">
                  <div className="w-18 h-18 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full"></div>
                </div>
              </button>
            ) : (
              <button type="submit" className="border rounded-md py-2">
                <div>
                  Continue &nbsp;
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </button>
            )}
          </Form>
        </Formik>
      </section>
    </>
  );
};

export default OtpOne;
