import {
  faPlus,
  faSignOut,
  faTrash,
  faUserAlt,
  faUserPlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidenav from "../Components/Sidenav";
import { CSSTransition } from "react-transition-group";

const AccountSettings = () => {
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [switchAccount, setSwitchAccount] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const redirect = useNavigate();

  const Logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    redirect("/");
  };

  const styles = {
    enter: "transform -translate-x-full opacity-0",
    enterActive:
      "transform translate-x-0 opacity-100 transition-all duration-500 ease-in-out",
    exitActive:
      "transform -translate-x-full opacity-0 transition-all duration-500 ease-in-out",
  };

  const handleDeleteAccount = () => {
    // if (user.data.userId) {
    //   const userId = user.data.userId;
    //   axios
    //     .delete(`${apiUrl}/users/delete/${userId}`)
    //     .then((response) => {
    //       console.log(response.data);
    //       localStorage.removeItem("user");
    //       dispatch({ type: "LOGOUT" });
    //       redirect("/");
    //     })
    //     .catch((error) => {
    //       console.error("Error while deleting account:", error);
    //     });
    // } else {
    //   console.error("User ID is undefined");
    // }
  };

  return (
    <>
      <Sidenav />
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
                    onClick={handleDeleteAccount}
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
