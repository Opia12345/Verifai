import React, { useState, useEffect } from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEye,
  faEyeSlash,
  faLock,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { getApiUrl } from "../config";
import axios from "axios";

const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const apiUrl = getApiUrl(process.env.NODE_ENV);
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  const initialValues = {
    Password: "",
    confirmPassword: "",
  };

  const styles = {
    enter: "transform translate-x-full opacity-0",
    enterActive:
      "transform -translate-x-0 opacity-100 transition-all duration-500 ease-in-out",
    exitActive:
      "transform translate-x-full opacity-0 transition-all duration-500 ease-in-out",
  };

  const Validation = yup.object().shape({
    Password: yup
      .string()
      .min(8, "Password must be more than 8 characters")
      .required("Please input your Password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("Password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const submitForm = (values, { resetForm }) => {
    setIsSubmitting(true);
    axios
      .patch(`${apiUrl}/password-update/${userId}`, values)
      .then((response) => {
        setErr(null);
        setIsSubmitting(false);
        navigate("/passwordUpdated");
        resetForm();
      })
      .catch((err) => {
        if (err.response) {
          setErr(err.response.data.message);
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
        <div className="bg-gray-500/5 backdrop-blur-lg p-8 border-[0.1px] rounded-lg shadow-xl w-full max-w-md">
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
                Update Your password
              </h2>
              <h5 className="flex text-center justify-center text-lg text-slate-400">
                Use a strong and memorable password with a combination of
                characters.
              </h5>

              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <Field
                  type={showPassword ? "text" : "password"}
                  name="Password"
                  placeholder="Password"
                  className="pl-10 pr-3 py-2 border text-black border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                />
                <ErrorMessage
                  name="Password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <Field
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="pl-10 pr-3 py-2 border text-black border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                />
                <ErrorMessage
                  name="confirmPassword"
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

export default UpdatePassword;
