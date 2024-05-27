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

const PasswordReset = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: "",
  };

  const initialValues2 = {
    email: "",
  };

  const initialValues3 = {
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
  });

  const validationSchema2 = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const validationSchema3 = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const styles = {
    enter: "transform -translate-x-full opacity-0",
    enterActive:
      "transform translate-x-0 opacity-100 transition-all duration-500 ease-in-out",
    exitActive:
      "transform -translate-x-full opacity-0 transition-all duration-500 ease-in-out",
  };

  const handleSubmit = (values) => {
    setLoading(true);
    // axios
    //   .put(
    //     `${apiUrl}/updateAccount`,
    //     { values, userId },
    //     { withCredentials: true }
    //   )
    //   .then((response) => {
    //     setSuccess(true);
    //     setTimeout(() => {
    //       setSuccess(false);
    //     }, 5000);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setError(err.response.data.message);
    //     setLoading(false);
    //   });
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
            <small>Your account details have been updated.</small>
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

      <Sidenav />
      <section className="lg:ml-[250px] lg:p-8 p-4 h-screen">
        <h1 className="font-bold text-3xl">Update Account</h1>
        <div className="flex items-center flex-col mt-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
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
                  name="username"
                  placeholder="Username"
                  className="bg-transparent text-white font-light text-xs w-full outline-none"
                />
              </span>
              <ErrorMessage
                name="username"
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
            onSubmit={handleSubmit}
          >
            <Form
              action=""
              className="mt-4 p-4 space-y-8 flex flex-col w-2/3 justify-center"
            >
              <span className="flex items-center bg-slate-200/20 md:w-1/2 w-full gap-2 g:p-8 rounded-md p-2 mt-4 lg:ml-[250px]">
                <FontAwesomeIcon icon={faEnvelope} />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="bg-transparent text-white font-light text-xs w-full outline-none"
                />
              </span>
              <ErrorMessage
                name="email"
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
            onSubmit={handleSubmit}
          >
            <Form
              action=""
              className="mt-4 p-4 space-y-8 flex flex-col w-2/3 justify-center"
            >
              <span className="flex items-center bg-slate-200/20 md:w-1/2 w-full gap-2 g:p-8 rounded-md p-2 mt-4 lg:ml-[250px]">
                <FontAwesomeIcon icon={faLockOpen} />
                <Field
                  type={passwordVisible ? "text" : "password"}
                  name="password"
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
                name="password"
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
