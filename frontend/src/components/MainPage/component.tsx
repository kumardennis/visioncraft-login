import React from "react";
import { BsArrowBarLeft } from "react-icons/bs";
import "./styles.scss";

type MainPageProps = {
  handleScreen: () => void;
};

const SignupForm = ({ handleScreen }: MainPageProps) => {
  return (
    <div className="main-page">
      <h2>GoodJob signing in!</h2>
      <button onClick={handleScreen} className="change-auth-screen">
        <BsArrowBarLeft /> Sign out!
      </button>
    </div>
  );
};

export default SignupForm;
