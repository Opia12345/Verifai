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
import { Link, useNavigate } from "react-router-dom";
import {
  faArrowRight,
  faEnvelope,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  //STATES
  const [showPassword, setShowPassword] = useState(false);
  const [successSignup, setSuccessSignup] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const redirect = useNavigate();

  const initialValues = {
    userName: "",
    Email: "",
    Password: "",
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
    // setLoading(true);
    // axios
    //   .post(`${apiUrl}/signup`, values)
    //   .then((response) => {
    //     setError(null);
    //     setSuccessSignup(true);
    // redirect("/emailConfirmation");
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
      <section className="bg-[url(/bg.jpg)] flex justify-center flex-col items-center bg-cover w-full bg-black/60 bg-blend-darken h-screen bg-center">
        <div className="flex justify-center flex-col items-center w-full p-8">
          <section className="">
            <Formik
              initialValues={initialValues}
              validationSchema={Validation}
              onSubmit={submitForm}
            >
              <Form
                className="flex flex-col text-center p-8 rounded-lg justify-center gap-4 frm"
                id="emailForm"
              >
                <h1 className="text-2xl font-bold">Setup Your Vault Account</h1>
                <h5>
                  Enter your details to create a secure account and keep your
                  credentials safe. Let's get started!
                </h5>
                <span className="flex items-center bg-slate-200/20 gap-2 rounded-md p-2 mt-4">
                  <FontAwesomeIcon icon={faUser} />
                  <Field
                    type="text"
                    name="userName"
                    placeholder="Username"
                    className="bg-transparent text-white font-light text-xs w-full outline-none"
                  />
                </span>
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-red-500 text-xs flex items-center "
                />
                <span className="flex items-center bg-slate-200/20 gap-2 rounded-md p-2 mt-4">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <Field
                    type="text"
                    name="Email"
                    placeholder="Email"
                    className="bg-transparent text-white font-light text-xs w-full outline-none"
                  />
                </span>
                <ErrorMessage
                  name="Email"
                  component="div"
                  className="text-red-500 text-xs flex items-center "
                />

                <span className="flex items-center bg-slate-200/20 gap-2 rounded-md p-2 mt-4">
                  <FontAwesomeIcon icon={faLock} />
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="Password"
                    placeholder="Password"
                    className="bg-transparent text-white font-light text-xs w-full outline-none"
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </span>
                <ErrorMessage
                  name="Password"
                  component="div"
                  className="text-red-500 text-xs flex items-center "
                />

                <span className="flex items-center bg-slate-200/20 gap-2 rounded-md p-2 mt-4">
                  <FontAwesomeIcon icon={faLock} />
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="bg-transparent text-white font-light text-xs w-full outline-none"
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </span>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-xs flex items-center"
                />

                {loading ? (
                  <button
                    disabled="true"
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
                      Register &nbsp;
                      <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                  </button>
                )}
                <h4 className="flex text-center items-center mt-4 text-slate-400">
                  Already have an account?&nbsp;
                  <Link
                    to="/signin"
                    className="underline hover:text-white duration-300 ease-in"
                  >
                    Login.
                  </Link>
                </h4>
              </Form>
            </Formik>
          </section>
        </div>
      </section>
    </>
  );
};

export default Register;
