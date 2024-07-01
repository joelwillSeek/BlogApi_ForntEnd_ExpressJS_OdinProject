import React, { MouseEvent, useContext, useRef } from "react";
import { serverPath } from "../../globalSettings";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../ContextProvider";

export default () => {
  let userNameRef = useRef<HTMLInputElement>(null);
  let emailRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);
  let formRef = useRef<HTMLFormElement>(null);
  let auth = useContext(GlobalContext);
  let navigateTO = useNavigate();

  const submitClicked = async (event: MouseEvent) => {
    if (!formRef.current?.checkValidity()) {
      return;
    }

    event.preventDefault();

    try {
      const Data = {
        userName: userNameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      };

      const response = await fetch(`${serverPath}/logIn`, {
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
        <h1 className="">LogIn</h1>
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
          type="submit"
          value={"Submit"}
          onClick={(e) => submitClicked(e)}
        />
        <p>
          Don't have an account? <a href="/signUp">SignUp</a>
        </p>
      </form>
    </>
  );
};
