import React, {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from "react";
import { serverPath } from "../globalSettings";
import GlobalContext from "../ContextProvider";
import { useNavigate } from "react-router-dom";
import styles from "../styles/signUpPage.module.css";

const SignupPage = () => {
  let userNameRef = useRef<HTMLInputElement>(null);
  let emailRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);
  let confirmPasswordRef = useRef<HTMLInputElement>(null);
  let formRef = useRef<HTMLFormElement>(null);

  let globalVariables = useContext(GlobalContext);
  const navigateTO = useNavigate();

  useEffect(() => {
    if (!globalVariables.isAuthenticated) navigateTO("/");
  }, []);

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

      await globalVariables?.login(token);

      globalVariables.setUserName(userName);
      navigateTO("/publicPost");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.logInBody}>
        <div className={styles.logIn}>
          <form ref={formRef} className={styles.formOfLogIn}>
            <h1 className={styles.logInHeader}>Become a blogger</h1>
            <p className={styles.logInPhrase}>Become one of us NOW!</p>
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
              type="password"
              className={styles.inputBox}
              placeholder="Confirm Password"
              name={"confirmPassword"}
              ref={confirmPasswordRef}
              required
            />
            <input
              type="submit"
              className={styles.submitInputBox}
              value={"Submit"}
              onClick={(e) => {
                submitClicked(e);
              }}
            />
            <p className={`${styles.logInPhrase}`}>
              Already have an account?{" "}
              <a href="/" className={`${styles.blueLink}`}>
                Login
              </a>
            </p>
          </form>
          <div className={`${styles.bigBanner} `}></div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
