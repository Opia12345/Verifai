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
import { faQuestion } from "@fortawesome/free-solid-svg-icons/faQuestion";

const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

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
    // axios
    //   .patch(`${apiUrl}/update-password/${userId}`, values, {
    //     withCredentials: true,
    //   })
    //   .then((response) => {
    //     setErr(null);
    //     setIsSubmitting(false);
    //     navigate("/passwordUpdated");
    //     resetForm();
    //   })
    //   .catch((err) => {
    //     if (err.response) {
    //       setErr(err.response.data.message);
    //       setTimeout(() => {
    //         setErr(false);
    //       }, 3000);
    //       setIsSubmitting(false);
    //     }
    //   });
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
              Update Your password
            </h2>
            <h5 className="flex text-center justify-center text-lg text-slate-400">
              Use a strong and memorable password with a combination of
              characters.
            </h5>

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

            {isSubmitting ? (
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
                  Update &nbsp;
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

export default UpdatePassword;
