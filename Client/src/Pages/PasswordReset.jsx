import { useState } from "react";
import {
  faCheckCircle,
  faEnvelope,
  faEye,
  faEyeSlash,
  faTimesCircle,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Sidenav from "../Components/Sidenav";
import {
  faArrowRight,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import { useUserContext } from "../Context/UserContext";
import { getApiUrl } from "../config";
import axios from "axios";

const PasswordReset = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userEmail, username, updateUserEmail, updateUsername } =
    useUserContext();
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;
  const apiUrl = getApiUrl(process.env.NODE_ENV);

  const initialValues = {
    userName: "",
  };

  const initialValues2 = {
    Email: "",
  };

  const initialValues3 = {
    Password: "",
  };

  const Validation = Yup.object().shape({
    userName: Yup.string().required("User Name is required"),
  });

  const validationSchema2 = Yup.object().shape({
    Email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const validationSchema3 = Yup.object().shape({
    Password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("Password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const styles = {
    enter: "transform -translate-x-full opacity-0",
    enterActive:
      "transform translate-x-0 opacity-100 transition-all duration-500 ease-in-out",
    exitActive:
      "transform -translate-x-full opacity-0 transition-all duration-500 ease-in-out",
  };

  const handleSubmit = (values, { resetForm }) => {
    setLoading(true);
    axios
      .patch(`${apiUrl}/username-update/${userId}`, values, { userId })
      .then((response) => {
        setSuccess(response.data.message);
        updateUsername(response.data.userName);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        setLoading(false);
        resetForm();
      })
      .catch((err) => {
        setError(err.response.data.message);
        setTimeout(() => {
          setError(false);
        }, 5000);
        setLoading(false);
      });
  };

  const handleSubmit2 = (values, { resetForm }) => {
    setLoading(true);
    axios
      .patch(`${apiUrl}/email-update/${userId}`, values, { userId })
      .then((response) => {
        setSuccess(response.data.message);
        updateUserEmail(response.data.userEmail);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        setLoading(false);
        resetForm();
      })
      .catch((err) => {
        setError(err.response.data.message);
        setTimeout(() => {
          setError(false);
        }, 5000);
        setLoading(false);
      });
  };

  const handleSubmit3 = (values, { resetForm }) => {
    setLoading(true);
    axios
      .patch(`${apiUrl}/password-update/${userId}`, values, { userId })
      .then((response) => {
        setSuccess(response.data.message);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        setLoading(false);
        resetForm();
      })
      .catch((err) => {
        setError(err.response.data.message);
        setTimeout(() => {
          setError(false);
        }, 5000);
        setLoading(false);
      });
  };

  const handleSwitch = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <CSSTransition
        in={success}
        classNames={styles}
        timeout={500}
        unmountOnExit
      >
        <div className="fixed top-10 lg:right-[40%] z-50 bg-slate-200/5 backdrop-blur-lg p-4 rounded-md flex items-center justify-center">
          <h5 className="flex items-center gap-4 text-center font-bold">
            <FontAwesomeIcon className="text-green-500" icon={faCheckCircle} />
            <small>{success}.</small>
          </h5>
        </div>
      </CSSTransition>

      <CSSTransition in={error} classNames={styles} timeout={500} unmountOnExit>
        <div className="fixed top-10 lg:right-[40%] z-50 bg-slate-200/5 backdrop-blur-lg p-4 rounded-md flex items-center justify-center">
          <h5 className="flex items-center gap-4 text-center font-bold">
            <FontAwesomeIcon className="text-red-500" icon={faTimesCircle} />
            <small>{error}.</small>
          </h5>
        </div>
      </CSSTransition>

      <section className="lg:ml-[250px] lg:p-8 p-4 h-screen">
        <h1 className="font-bold text-3xl">Update Account</h1>
        <div className="flex items-center flex-col mt-4">
          <Formik
            initialValues={initialValues}
            validationSchema={Validation}
            onSubmit={handleSubmit}
          >
            <Form
              action=""
              className="mt-4 p-4 space-y-8 flex flex-col w-2/3 justify-center"
            >
              <span className="flex items-center bg-slate-200/20 md:w-1/2 w-full gap-2 g:p-8 rounded-md p-2 mt-4 lg:ml-[250px]">
                <FontAwesomeIcon icon={faUser} />
                <Field
                  type="text"
                  name="userName"
                  placeholder={username}
                  className="bg-transparent text-white font-light text-xs w-full outline-none"
                />
              </span>
              <ErrorMessage
                name="userName"
                component="div"
                className="text-red-500 text-xs flex items-center lg:ml-[250px]"
              />
              <button
                type="submit"
                className="bg-blue-500 transition duration-300 justify-center ease-in-out text-white flex items-center bg-slate-200/20 md:w-1/2 w-full gap-2 g:p-8 p-2 mt-4 lg:ml-[250px] hover:bg-blue-700 cursor-pointer rounded-lg py-2"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-18 h-18 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full"></div>
                  </div>
                ) : (
                  <span>
                    Update <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                )}
              </button>
            </Form>
          </Formik>

          <Formik
            initialValues={initialValues2}
            validationSchema={validationSchema2}
            onSubmit={handleSubmit2}
          >
            <Form
              action=""
              className="mt-4 p-4 space-y-8 flex flex-col w-2/3 justify-center"
            >
              <span className="flex items-center bg-slate-200/20 md:w-1/2 w-full gap-2 g:p-8 rounded-md p-2 mt-4 lg:ml-[250px]">
                <FontAwesomeIcon icon={faEnvelope} />
                <Field
                  type="email"
                  name="Email"
                  placeholder={userEmail}
                  className="bg-transparent text-white font-light text-xs w-full outline-none"
                />
              </span>
              <ErrorMessage
                name="Email"
                component="div"
                className="text-red-500 text-xs flex items-center lg:ml-[250px]"
              />

              <button
                type="submit"
                className="bg-blue-500 transition duration-300 justify-center flex items-center bg-slate-200/20 md:w-1/2 w-full gap-2 g:p-8 p-2 mt-4 lg:ml-[250px] ease-in-out text-white hover:bg-blue-700 cursor-pointer rounded-lg py-2"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-18 h-18 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full"></div>
                  </div>
                ) : (
                  <span>
                    Update <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                )}
              </button>
            </Form>
          </Formik>

          <Formik
            initialValues={initialValues3}
            validationSchema={validationSchema3}
            onSubmit={handleSubmit3}
          >
            <Form
              action=""
              className="mt-4 p-4 space-y-8 flex flex-col w-2/3 justify-center"
            >
              <span className="flex items-center bg-slate-200/20 md:w-1/2 w-full gap-2 g:p-8 rounded-md p-2 mt-4 lg:ml-[250px]">
                <FontAwesomeIcon icon={faLockOpen} />
                <Field
                  type={passwordVisible ? "text" : "password"}
                  name="Password"
                  placeholder="Password"
                  className="bg-transparent text-white font-light text-xs w-full outline-none"
                />
                <FontAwesomeIcon
                  onClick={handleSwitch}
                  icon={passwordVisible ? faEye : faEyeSlash}
                  className="cursor-pointer text-white"
                />
              </span>
              <ErrorMessage
                name="Password"
                component="div"
                className="text-red-500 text-xs flex items-center lg:ml-[250px]"
              />

              <span className="flex items-center bg-slate-200/20 md:w-1/2 w-full gap-2 g:p-8 rounded-md p-2 mt-4 lg:ml-[250px]">
                <FontAwesomeIcon icon={faLock} />
                <Field
                  type={passwordVisible ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="bg-transparent text-white font-light text-xs w-full outline-none"
                />
                <FontAwesomeIcon
                  onClick={handleSwitch}
                  icon={passwordVisible ? faEye : faEyeSlash}
                  className="cursor-pointer text-white"
                />
              </span>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-xs flex items-center lg:ml-[250px]"
              />

              <button
                type="submit"
                className="bg-blue-500 justify-center transition duration-300 ease-in-out text-white hover:bg-blue-700 cursor-pointer flex items-center bg-slate-200/20 md:w-1/2 w-full gap-2 g:p-8 rounded-md p-2 mt-4 lg:ml-[250px] py-2"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-18 h-18 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full"></div>
                  </div>
                ) : (
                  <span>
                    Update <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                )}
              </button>
            </Form>
          </Formik>
        </div>
      </section>
    </>
  );
};

export default PasswordReset;
