import React, { useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { AiTwotoneLock } from "react-icons/ai";
import { BsArrowBarLeft } from "react-icons/bs";
import "./styles.scss";

type SigninFormProps = {
  changeAuthForm: () => void;
  handleScreen: () => void;
};

interface SigninData {
  email: string;
  password: string;
}

interface Response {
  type: string;
  message: string;
}

const SigninForm = ({ changeAuthForm, handleScreen }: SigninFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signinData, setSigninData] = useState<SigninData | {}>({});

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    switch (event.currentTarget.id) {
      case "user-email":
        setEmail(event.currentTarget.value);
        break;

      case "user-password":
        setPassword(event.currentTarget.value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSigninData({
      email,
      password,
    });
  };

  useEffect(() => {
    if (Object.keys(signinData).length !== 0) {
      fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signinData),
      })
        .then((response) => response.json())
        .then((data: Response) =>
          alert(data.message + " Click 'Okay' to continue!")
        )
        .then(handleScreen)
        .catch((err: Error) => alert(err));
    }
  }, [signinData, handleScreen]);

  return (
    <div className="signin-form">
      <h2>Sign in!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user-email">
          Email <MdEmail />
        </label>
        <input
          className="user-input"
          id="user-email"
          name="user-email"
          type="email"
          placeholder="Eg: abc123@gmail.com"
          onChange={handleInput}
          value={email}
          required
        />

        <label htmlFor="user-password">
          Password <AiTwotoneLock />
        </label>
        <input
          className="user-input"
          id="user-password"
          name="user-password"
          type="password"
          placeholder="Eg: somecrazyAs123Password"
          onChange={handleInput}
          value={password}
          required
        />

        <input id="submit-sign-in" type="submit" value="Sign in!" />
      </form>

      <div className="toc">
        Use of this service is subject to terms and conditions.
      </div>

      <button onClick={changeAuthForm} className="change-auth-screen">
        <BsArrowBarLeft /> Take me to Sign Up!
      </button>
    </div>
  );
};

export default SigninForm;
