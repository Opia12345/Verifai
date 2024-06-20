import React, { useEffect, useState } from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";
import * as yup from "yup";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import {
  faEnvelope,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

const Help = () => {
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const validationSchema = yup.object().shape({
    name: yup.string().required("This field is required"),
    email: yup
      .string()
      .email("Invalid Email Address")
      .required("Email is required"),
    message: yup.string().required("This field is required"),
  });

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const styles = {
    enter: "transform translate-x-full opacity-0",
    enterActive:
      "transform -translate-x-0 opacity-100 transition-all duration-500 ease-in-out",
    exitActive:
      "transform translate-x-full opacity-0 transition-all duration-500 ease-in-out",
  };

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userId = import.meta.env.VITE_EMAILJS_USER_ID;

  const submitForm = (values, { resetForm }) => {
    const { name, email, message } = values;
    setLoading(true);
    emailjs
      .send(
        serviceId,
        templateId,
        { from_name: name, to_email: email, message: message },
        userId
      )
      .then(
        (result) => {
          if (result.status === 200) {
            setSubmit(true);
            setTimeout(() => {
              setSubmit(false);
            }, 3000);
            setLoading(false);
            resetForm();
          }
        },
        (error) => {
          setLoading(false);
          setErr(error.text);
          setTimeout(() => {
            setErr(false);
          }, 6000);
        }
      );
  };

  return (
    <>
      <CSSTransition
        in={submit}
        classNames={styles}
        timeout={500}
        unmountOnExit
      >
        <div className="fixed top-10 right-1/2 transform translate-x-1/2 z-50 bg-green-100 text-green-700 p-4 rounded-md flex items-center justify-center shadow-lg">
          <h5 className="flex items-center gap-2 font-bold">
            <FontAwesomeIcon icon={faCheckCircle} />
            <span>Your message has been successfully delivered!</span>
          </h5>
        </div>
      </CSSTransition>

      <CSSTransition in={err} classNames={styles} timeout={500} unmountOnExit>
        <div className="fixed top-10 right-1/2 transform translate-x-1/2 z-50 bg-red-100 text-red-700 p-4 rounded-md flex items-center justify-center shadow-lg">
          <h5 className="flex items-center gap-2 font-bold">
            <FontAwesomeIcon icon={faTimesCircle} />
            <span>{err}</span>
          </h5>
        </div>
      </CSSTransition>

      <section className="min-h-screen flex justify-center items-center lg:ml-[250px] lg:p-8 p-4 h-screen">
        <div className="bg-gray-500/5 p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitForm}
          >
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="pl-10 pr-3 py-2 border text-black border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="name"
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
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="pl-10 pr-3 py-2 border text-black border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="relative">
                  <Field
                    as="textarea"
                    name="message"
                    placeholder="Message"
                    rows={5}
                    className="pl-3 pr-3 py-2 border text-black border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`py-2 mt-4 rounded-md text-white font-bold transition ${
                  loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                    <span className="ml-2">Sending...</span>
                  </div>
                ) : (
                  <>
                    Send &nbsp;
                    <FontAwesomeIcon icon={faPaperPlane} />
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

export default Help;
