import React, {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useContext,
  useRef,
} from "react";
import { serverPath } from "../../globalSettings";
import GlobalContext from "../../ContextProvider";
import { useNavigate } from "react-router-dom";
const SignupPage = () => {
  let userNameRef = useRef<HTMLInputElement>(null);
  let emailRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);
  let confirmPasswordRef = useRef<HTMLInputElement>(null);
  let formRef = useRef<HTMLFormElement>(null);
  let auth = useContext(GlobalContext);
  const navigateTO = useNavigate();

  const submitClicked = async (event: MouseEvent) => {
    if (!formRef.current?.checkValidity()) {
      return;
    }

    event.preventDefault();

    if (passwordRef.current?.value != confirmPasswordRef.current?.value) {
      alert("Password Dont");
      return;
    }

    try {
      const Data = {
        userName: userNameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      };

      const response = await fetch(`${serverPath}/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });
      const { token, expireingOn, userName } = await response.json();

      await auth?.login(token);

      auth.setUserName(userName);
      navigateTO("/publicPost");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form ref={formRef}>
        <h1 className="">SignUp</h1>
        <input
          type="text"
          placeholder="User Name"
          name={"userName"}
          ref={userNameRef}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name={"email"}
          ref={emailRef}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name={"password"}
          ref={passwordRef}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name={"confirmPassword"}
          ref={confirmPasswordRef}
          required
        />
        <input
          type="submit"
          value={"Submit"}
          onClick={(e) => {
            submitClicked(e);
          }}
        />
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </>
  );
};

export default SignupPage;
