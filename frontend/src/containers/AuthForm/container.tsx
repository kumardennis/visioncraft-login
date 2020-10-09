import React, { useState } from "react";
import SignupForm from "components/SignupForm/component";
import SigninForm from "components/SigninForm/component";

type AuthProps = {
  handleScreen: () => void;
};

const AuthForm = ({ handleScreen }: AuthProps) => {
  const [isSigningUp, setIsSigningUp] = useState(true);

  const changeAuthForm = () => {
    setIsSigningUp(!isSigningUp);
  };
  return (
    <>
      {isSigningUp ? (
        <SignupForm changeAuthForm={changeAuthForm} />
      ) : (
        <SigninForm
          handleScreen={handleScreen}
          changeAuthForm={changeAuthForm}
        />
      )}
    </>
  );
};

export default AuthForm;
