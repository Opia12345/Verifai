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
import Sidenav from "../Components/Sidenav";
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

  //ENVIRONMENTAL VARIABLES
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
          setIsSubmitting(false);
          setErr(error);
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
        <div className="fixed top-10 lg:right-[40%] z-50 bg-slate-200/5 backdrop-blur-lg p-4 rounded-md flex items-center justify-center">
          <h5 className="flex items-center gap-4 text-center font-bold">
            <FontAwesomeIcon className="text-green-500" icon={faCheckCircle} />
            <small className="font-semibold">
              Your message has been sucessfully delivered!
            </small>
          </h5>
        </div>
      </CSSTransition>

      <CSSTransition in={err} classNames={styles} timeout={500} unmountOnExit>
        <div className="fixed top-10 lg:right-[40%] z-50 bg-slate-200/5 backdrop-blur-lg p-4 rounded-md flex items-center justify-center">
          <h5 className="flex items-center gap-4 text-center font-bold">
            <FontAwesomeIcon className="text-red-500" icon={faTimesCircle} />
            <small className="font-semibold">{err}</small>
          </h5>
        </div>
      </CSSTransition>

      <Sidenav />
      <section className="lg:ml-[250px] lg:p-8 p-4 h-screen">
        <h1 className="font-bold text-3xl">Contact Us</h1>
        <div className="w-full lg:p-10 flex items-center justify-center relative flex-col">
          <div className="w-full -mt-16">
            <div className="flex lg:p-10 mt-12 relative rounded-lg w-full">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitForm}
              >
                <Form className="mt-4 w-full flex flex-col" id="emailForm">
                  <span className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                    <span className="flex items-center bg-slate-200/20 gap-2 rounded-md p-2 mt-4">
                      <FontAwesomeIcon icon={faUser} />
                      <Field
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="bg-transparent text-white font-light text-xs w-full outline-none"
                      />
                    </span>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500"
                    />

                    <span className="flex items-center bg-slate-200/20 gap-2 rounded-md p-2 mt-4">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <Field
                        type="email"
                        name="email"
                        placeholder="johndoe@gmail.com"
                        className="bg-transparent text-white font-light text-xs w-full outline-none"
                      />
                    </span>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                  </span>

                  <span className="flex items-center bg-slate-200/20 gap-2 rounded-md p-2 mt-4">
                    <Field
                      as="textarea"
                      type="text"
                      name="message"
                      placeholder="Message"
                      rows={10}
                      className="bg-transparent text-white font-light text-xs w-full outline-none"
                    />
                  </span>
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500"
                  />
                  <button
                    type="submit"
                    className="border mt-4 transition duration-300 justify-center ease-in-out text-white flex items-center hover:bg-slate-200/20 cursor-pointer rounded-lg py-2"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-18 h-18 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full"></div>
                      </div>
                    ) : (
                      <span>
                        Send <FontAwesomeIcon icon={faPaperPlane} />
                      </span>
                    )}
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Help;