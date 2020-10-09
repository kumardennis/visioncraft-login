import React, { useState } from "react";
import SignupForm from "components/SignupForm/component";
import SigninForm from "components/SigninForm/component";

type AuthProps = {
  handleScreen: () => void;
};

const AuthForm = ({ handleScreen }: AuthProps) => {
  const [isSigningUp, setIsSigningUp] = useState(true);

  const handleIsSigningUp = () => {
    setIsSigningUp(!isSigningUp);
  };
  return (
    <>
      {isSigningUp ? (
        <SignupForm handleIsSigningUp={handleIsSigningUp} />
      ) : (
        <SigninForm
          handleScreen={handleScreen}
          handleIsSigningUp={handleIsSigningUp}
        />
      )}
    </>
  );
};

export default AuthForm;
