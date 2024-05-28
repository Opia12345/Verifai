import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const EmailConfirmed = () => {
  return (
    <>
      <section className="flex justify-center flex-col h-screen p-8 w-screen items-center">
        <img src="/confirm.svg" className="lg:w-[30%]" alt="" />
        <h4 className="text-lg text-center">
          Thank you for verifying your email! You can now proceed to login and{" "}
          <br />
          access our platform. We're excited to have you join our community of{" "}
          <br />
          learners. Click below to login and start your personalized learning
          journey!
        </h4>
        <div className="flex flex-col items-center mt-8 gap-4">
          <Link to="/signin">
            <button className="cursor-pointer items-center hover:bg-transparent border transition ease-in duration-300 border-teal-700 bg-teal-700 py-2 px-6 rounded-md">
              <FontAwesomeIcon icon={faUser} /> &nbsp; Login
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default EmailConfirmed;
