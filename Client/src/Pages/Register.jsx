import React, { useState } from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import * as yup from "yup";
import { Link } from "react-router-dom";

const Register = () => {
  //STATES
  const [showPassword, setShowPassword] = useState(false);
  const [successSignup, setSuccessSignup] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const initialValue = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("Name field is required"),
    email: yup
      .string()
      .email("Please use a valid email address")
      .required("Please input your email address"),
    password: yup
      .string()
      .min(8, "password must be at least 8 characters")
      .required("Password is required"),
  });

  const submitForm = (values, { resetForm }) => {
    // setLoading(true);
    // axios
    //   .post(`${apiUrl}/signup`, values)
    //   .then((response) => {
    //     setError(null);
    //     setSuccessSignup(true);
    //     setTimeout(() => {
    //       setSuccessSignup(false);
    //     }, 3000);
    //     resetForm();
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     if (err.response) {
    //       setError(err.response.data.error);
    //       setTimeout(() => {
    //         setError(false);
    //       }, 3000);
    //       setLoading(false);
    //     }
    //   });
  };

  return (
    <>
      <section className="bg-[url(/bg.jpg)] bg-cover w-full bg-black/75 h-screen bg-center bg-blend-darken text-white">
        {successSignup && (
          <>
            <section className="absolute z-30 top-0 h-full w-full left-0 text-black flex justify-center items-center bg-slate-300/10 backdrop-blur-sm rounded-md flex-col p-4">
              <div className="bg-slate-300 rounded-xl p-4">
                <b className="text-xl flex justify-center p-3">
                  Registration successful!
                </b>
                <small>
                  You will receive a confirmation email shortly. Please check
                  your inbox to verify your account.
                </small>
              </div>
            </section>
          </>
        )}
        {error && (
          <section className="absolute z-30 top-0 h-full w-full left-0 text-black flex justify-center items-center bg-slate-300/10 backdrop-blur-sm rounded-md flex-col p-4">
            <div className="bg-slate-300 rounded-xl p-4">
              <b className="text-xl flex justify-center p-3">Sorry!</b>
              <small>{error}.</small>
            </div>
          </section>
        )}
        <div className="p-4 space-y-3 flex justify-center items-center flex-col">
          <b className="text-2xl mt-32">Register a Free Account</b>

          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={submitForm}
          >
            <Form
              className="mt-4 p-4 space-y-8 flex flex-col w-3/4 md:w-1/2 justify-center"
              id="emailForm"
            >
              <Field
                type="text"
                name="username"
                placeholder="Username"
                className="bg-transparent focus-within-border-blue-400 p-2 outline-none rounded-lg  border"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />

              <Field
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
                className="bg-transparent focus-within-border-blue-400 p-2 outline-none rounded-lg  border"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />

              <span className="flex justify-between items-center focus-within-border-blue-400 p-2 outline-none rounded-lg border">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="bg-transparent outline-none w-full"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  onClick={handleShowPassword}
                />
              </span>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />

              <button
                type="submit"
                className="bg-blue-500 transition duration-300 ease-in-out text-white hover:bg-blue-700 cursor-pointer rounded-lg py-2"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-18 h-18 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full"></div>
                  </div>
                ) : (
                  <span>Register</span>
                )}
              </button>
              <small className="flex justify-center items-center">
                Already have an account?&nbsp;
                <Link to="/signin" className="underline">
                  {" "}
                  SignIn
                </Link>
              </small>
            </Form>
          </Formik>
        </div>
      </section>
    </>
  );
};

export default Register;
