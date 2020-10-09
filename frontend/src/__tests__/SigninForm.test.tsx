import React from "react";
import { mount, shallow, configure } from "enzyme";
import SigninForm from "../components/SigninForm/component";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Signin Form", () => {
  it("should render SignupForm", () => {
    const signinForm = shallow(
      <SigninForm handleIsSigningUp={() => {}} handleScreen={() => {}} />
    );
    expect(signinForm).toMatchSnapshot();
  });
});

describe("Inputs for SigninForm", () => {
  let wrapper;

  test("Render email check", () => {
    wrapper = mount(
      <SigninForm handleIsSigningUp={() => {}} handleScreen={() => {}} />
    );

    const emailInput = wrapper
      .find('input[id="user-email"]')
      .simulate("change");

    expect(emailInput).toMatchSnapshot();
  });

  test("Render password check", () => {
    wrapper = mount(
      <SigninForm handleIsSigningUp={() => {}} handleScreen={() => {}} />
    );

    const passwordInput = wrapper
      .find('input[id="user-password"]')
      .simulate("change");

    expect(passwordInput).toMatchSnapshot();
  });
});
