import React, { MouseEvent, useContext, useEffect, useRef } from "react";
import { links, serverPath, serverRoutes } from "../globalSettings";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../ContextProvider";
import styles from "../styles/loginPage.module.css";

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
      navigateTO(links.SignUpPageLink);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.logInBody}>
        <div className={styles.logIn}>
          <form ref={formRef} className={styles.formOfLogIn}>
            <h1 className={styles.logInHeader}>
              Hello, <br />
              Welcome Back Blogger
            </h1>
            <p className={styles.logInPhrase}>
              Hey, Welcome back to your blogger community
            </p>
            <input
              className={styles.inputBox}
              type="text"
              placeholder="User Name"
              name={"userName"}
              ref={userNameRef}
              required
            />
            <input
              className={styles.inputBox}
              type="email"
              placeholder="Email"
              name={"email"}
              ref={emailRef}
              required
            />
            <input
              className={styles.inputBox}
              type="password"
              placeholder="Password"
              name={"password"}
              ref={passwordRef}
              required
            />
            <input
              className={styles.submitInputBox}
              type="submit"
              value={"Submit"}
              onClick={(e) => submitClicked(e)}
            />
            <p className={`${styles.logInPhrase}`}>
              Don't have an account?{" "}
              <a
                onClick={() => navigateTO("/signUp")}
                className={`${styles.blueLink}`}
              >
                SignUp
              </a>
            </p>
          </form>
          <div className={`${styles.bigBanner} `}></div>
        </div>
      </div>
    </>
  );
};
