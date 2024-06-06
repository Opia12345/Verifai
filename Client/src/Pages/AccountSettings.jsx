import {
  faPlus,
  faSignOut,
  faTimesCircle,
  faTrash,
  faUserAlt,
  faUserPlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidenav from "../Components/Sidenav";
import { CSSTransition } from "react-transition-group";
import { useAuthContext } from "../Hooks/useAuthContext";
import axios from "axios";
import { getApiUrl } from "../config";

const AccountSettings = () => {
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const [err, setErr] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const apiUrl = getApiUrl(process.env.NODE_ENV);
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  const Logout = () => {
    axios
      .post(`${apiUrl}/logout`)
      .then((response) => {
        setErr(null);
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
        navigate("/signin");
        window.location.reload();
      })
      .catch((err) => {
        if (err.response) {
          setErr(err.response.data.error);
          setTimeout(() => {
            setErr(false);
          }, 3000);
        }
      });
  };

  const styles = {
    enter: "transform -translate-x-full opacity-0",
    enterActive:
      "transform translate-x-0 opacity-100 transition-all duration-500 ease-in-out",
    exitActive:
      "transform -translate-x-full opacity-0 transition-all duration-500 ease-in-out",
  };

  const deleteAcc = () => {
    axios
      .delete(`${apiUrl}/users/delete/${userId}`)
      .then((response) => {
        setErr(null);
        localStorage.removeItem("user");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        dispatch({ type: "LOGOUT" });
        navigate("/");
        window.location.reload();
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
        <div className="fixed top-10 lg:right-[40%] z-50 bg-slate-200/5 backdrop-blur-lg p-4 rounded-md flex items-center justify-center">
          <h5 className="flex items-center gap-4 text-center font-bold">
            <FontAwesomeIcon className="text-red-500" icon={faTimesCircle} />
            <small>{err}.</small>
          </h5>
        </div>
      </CSSTransition>
      <section className="lg:ml-[250px] lg:p-8 p-4 h-screen">
        <h1 className="font-bold text-3xl">Account Settings</h1>
        <div className="flex flex-col justify-center mt-8">
          <div
            onClick={() => {
              setDeleteAccount(!deleteAccount);
            }}
            className="flex items-center p-2 w-full rounded-md transition duration-300 ease-in-out space-x-2 text-white cursor-pointer hover:bg-slate-200/20"
          >
            <FontAwesomeIcon icon={faTrash} />
            <b>Delete Account</b>
          </div>

          <CSSTransition
            in={deleteAccount}
            classNames={styles}
            timeout={500}
            unmountOnExit
          >
            <div className="fixed h-screen w-full z-50 flex items-center justify-center top-0 right-0 bg-slate-200/5 backdrop-blur-xl p-8">
              <div className="flex rounded-lg justify-center flex-col items-center w-[400px] p-4 bg-slate-200/20">
                <small>
                  <b className="flex justify-center text-xl">
                    Are you sure you want to delete your account?
                  </b>
                  <br />
                  Deleting your account will permanently remove all your data
                  and history associated with this account. This action cannot
                  be undone. If you have any concerns or would like to export
                  your data, please contact our support team before proceeding.
                  <p className="mt-3">
                    If you understand the consequences and still wish to
                    proceed, please confirm your decision below.
                  </p>
                </small>
                <div className="space-x-3 mt-4">
                  <button
                    onClick={deleteAcc}
                    className="bg-red-500 p-2 transition ease-in-out duration-200 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setDeleteAccount(!deleteAccount);
                    }}
                    className="hover:border border border-slate-200/10 transition ease-in-out duration-200  hover:border-white rounded-md p-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </CSSTransition>

          <div
            onClick={() => {
              setLogOut(!logOut);
            }}
            className="flex items-center p-2 w-full rounded-md transition duration-300 ease-in-out space-x-2 text-white cursor-pointer hover:bg-slate-200/20"
          >
            <FontAwesomeIcon icon={faSignOut} />
            <b>Log Out</b>
          </div>

          <CSSTransition
            in={logOut}
            classNames={styles}
            timeout={600}
            unmountOnExit
          >
            <div className="fixed h-screen w-full z-50 flex items-center justify-center top-0 right-0 p-8 bg-slate-200/5 backdrop-blur-xl">
              <div className="flex flex-col rounded-lg justify-center space-x-4 items-center h-auto w-auto p-10 bg-slate-200/20">
                <b>Logout</b>
                <small>You will have to log back in again.</small>
                <div className="space-x-4 mt-4">
                  <button
                    onClick={Logout}
                    className="p-2 bg-red-500 transition ease-in-out duration-300 rounded-md hover:bg-red-600"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => {
                      setLogOut(!logOut);
                    }}
                    className="p-2 border transition ease-in-out duration-300 rounded-md hover:bg-white hover:text-black"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </CSSTransition>
        </div>
      </section>
    </>
  );
};

export default AccountSettings;
