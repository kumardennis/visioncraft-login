import React, { useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { AiTwotoneLock } from "react-icons/ai";
import { BsArrowBarRight } from "react-icons/bs";
import "./styles.scss";

interface SignupFormProps {
  changeAuthForm: () => void;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Response {
  type: string;
  message: string;
}

const SignupForm = ({ changeAuthForm }: SignupFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupData, setSignupData] = useState<SignupData | {}>({});

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    switch (event.currentTarget.id) {
      case "user-first-name":
        setFirstName(event.currentTarget.value);
        break;

      case "user-last-name":
        setLastName(event.currentTarget.value);
        break;

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

    setSignupData({
      firstName,
      lastName,
      email,
      password,
    });
  };

  useEffect(() => {
    if (Object.keys(signupData).length !== 0) {
      fetch("/signup", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      })
        .then((response) => response.json())
        .then((data: Response) => {
          alert(data.message); // TODO: add Toastify
          data.type === "success" && changeAuthForm();
        })
        .catch((err: Error) => alert(err)); // TODO: add Toastify
    }
  }, [signupData, changeAuthForm]);

  return (
    <div className="signup-form">
      <h2>Sign up!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user-first-name">First Name</label>
        <input
          className="user-input"
          id="user-first-name"
          name="user-first-name"
          type="text"
          placeholder="Eg: John"
          onChange={handleInput}
          value={firstName}
          required
        />

        <label htmlFor="user-last-name">Last Name</label>
        <input
          className="user-input"
          id="user-last-name"
          name="user-last-name"
          type="text"
          placeholder="Eg: Holden"
          onChange={handleInput}
          value={lastName}
          required
        />

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

        <input id="submit-sign-up" type="submit" value="Sign up!" />
      </form>

      <div className="toc">
        Use of this service is subject to terms and conditions.
      </div>

      <button onClick={changeAuthForm} className="change-auth-screen">
        Take me to Sign In! <BsArrowBarRight />
      </button>
    </div>
  );
};

export default SignupForm;
