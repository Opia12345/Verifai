import React, { useState } from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {
  faArrowRight,
  faEnvelope,
  faLock,
  faTimesCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getApiUrl } from "../config";
import { CSSTransition } from "react-transition-group";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = getApiUrl(process.env.NODE_ENV);
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;
  const redirect = useNavigate();

  const styles = {
    enter: "transform -translate-x-full opacity-0",
    enterActive:
      "transform translate-x-0 opacity-100 transition-all duration-500 ease-in-out",
    exitActive:
      "transform -translate-x-full opacity-0 transition-all duration-500 ease-in-out",
  };

  const initialValues = {
    userName: "",
    Email: "",
    Password: "",
    confirmPassword: "",
  };

  const Validation = yup.object().shape({
    userName: yup.string().required("User Name is required"),
    Email: yup
      .string()
      .email("Please use a valid email address")
      .required("Email is required"),
    Password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("Password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const submitForm = (values, { resetForm }) => {
    setLoading(true);
    axios
      .post(`${apiUrl}/register`, values)
      .then((response) => {
        setError(null);
        localStorage.setItem("user", JSON.stringify(response.data));
        redirect(`/emailConfirmation/${userId}`);
        resetForm();
        setLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.error);
          setTimeout(() => {
            setError(false);
          }, 3000);
          setLoading(false);
        }
      });
  };

  return (
    <>
      <CSSTransition in={error} classNames={styles} timeout={500} unmountOnExit>
        <div className="fixed top-10 right-1/2 transform translate-x-1/2 z-50 bg-red-500/80 text-white p-4 rounded-md flex items-center justify-center shadow-lg">
          <h5 className="flex items-center gap-2 font-bold">
            <FontAwesomeIcon icon={faTimesCircle} />
            <span>{error}</span>
          </h5>
        </div>
      </CSSTransition>

      <section className="bg-[url('/bg.jpg')] flex justify-center flex-col items-center bg-cover w-full bg-black/60 bg-blend-darken min-h-screen">
        <div className="bg-gray-500/5 backdrop-blur-lg border-[0.1px] p-8 rounded-lg shadow-xl w-full max-w-md">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Logo" className="w-[120px]" />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={Validation}
            onSubmit={submitForm}
          >
            <Form className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-center text-white">
                Create Your Vault Account
              </h1>
              <p className="text-center text-slate-400">
                Enter your details to create a secure account and keep your
                credentials safe.
              </p>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <Field
                  type="text"
                  name="userName"
                  placeholder="Username"
                  className="pl-10 pr-3 py-2 border text-black border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
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
                  loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                ) : (
                  <>
                    Register &nbsp;
                    <FontAwesomeIcon icon={faArrowRight} />
                  </>
                )}
              </button>
              <p className="text-center text-gray-600 mt-4">
                Already have an account?&nbsp;
                <Link to="/signin" className="text-blue-500 hover:underline">
                  Login.
                </Link>
              </p>
            </Form>
          </Formik>
        </div>
      </section>
    </>
  );
};

export default Register;
