import React from "react";
import { mount, shallow, configure } from "enzyme";
import SignupForm from "../components/SignupForm/component";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Signup Form", () => {
  it("should render SignupForm", () => {
    const signupForm = shallow(<SignupForm handleIsSigningUp={() => {}} />);
    expect(signupForm).toMatchSnapshot();
  });
});

describe("Inputs for SignupForm", () => {
  let wrapper;

  test("Render firstName check", () => {
    wrapper = mount(<SignupForm handleIsSigningUp={() => {}} />);
    const handleInput = jest.fn();

    const firstNametInput = wrapper
      .find('input[id="user-first-name"]')
      .simulate("change");

    expect(firstNametInput).toMatchSnapshot();
  });

  test("Render lastName check", () => {
    wrapper = mount(<SignupForm handleIsSigningUp={() => {}} />);
    const handleInput = jest.fn();

    const lastNametInput = wrapper
      .find('input[id="user-last-name"]')
      .simulate("change");

    expect(lastNametInput).toMatchSnapshot();
  });

  test("Render email check", () => {
    wrapper = mount(<SignupForm handleIsSigningUp={() => {}} />);
    const handleInput = jest.fn();

    const emailInput = wrapper
      .find('input[id="user-email"]')
      .simulate("change");

    expect(emailInput).toMatchSnapshot();
  });

  test("Render password check", () => {
    wrapper = mount(<SignupForm handleIsSigningUp={() => {}} />);
    const handleInput = jest.fn();

    const passwordInput = wrapper
      .find('input[id="user-password"]')
      .simulate("change");

    expect(passwordInput).toMatchSnapshot();
  });
});
