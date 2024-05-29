import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faChevronRight,
  faLock,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import Sidenav from "../Components/Sidenav";

const Settings = () => {
  return (
    <>
      <section className="lg:ml-[250px] lg:p-8 p-4 h-screen">
        <div className="">
          <h1 className="font-bold text-3xl">Settings</h1>
          <div className="flex mt-8 items-start space-y-1 flex-col">
            <Link to="/accountSettings" className="w-full">
              <div className="flex items-center justify-between p-2 w-full rounded-md transition duration-300 ease-in-out space-x-2 text-white cursor-pointer hover:bg-slate-200/20">
                <div className="space-x-3">
                  <FontAwesomeIcon icon={faUserAlt} />
                  <b>My Account</b>
                </div>
                <span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </div>
            </Link>

            <Link to="/passwordReset" className="w-full">
              <div className="flex items-center justify-between p-2 w-full rounded-md transition duration-300 ease-in-out space-x-2 text-white cursor-pointer hover:bg-slate-200/20">
                <div className="space-x-3">
                  <FontAwesomeIcon icon={faLock} />
                  <b>Account Update</b>
                </div>
                <span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
