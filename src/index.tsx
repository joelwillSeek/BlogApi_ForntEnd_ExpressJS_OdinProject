import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./assets/pages/SignupPage";
import "./styles/styles.css";
import { GlobalContextProvider } from "./ContextProvider";
import PublicPostPage from "./assets/pages/PublicPostPage";
import { AuthoringAndEditing } from "./assets/pages/AuthoringAndEditing";
import LoginPage from "./assets/pages/LoginPage";
import SeeMoreOfPublicPost from "./assets/pages/SeeMoreOfPublicPost";
import UpdatePostAndCommentsPage from "./assets/pages/UpdatepostAndComments";
import { links } from "./globalSettings";
function App() {
  return (
    <>
      <Routes>
        <Route path={links.SignUpPageLink} element={<SignupPage />} />
        <Route path={links.LogInPageLink} element={<LoginPage></LoginPage>} />
        <Route
          path={links.PublicPostPageLink}
          element={<PublicPostPage />}
        ></Route>
        <Route
          path={links.SeenMoreOfPublicPostPageLink}
          element={<SeeMoreOfPublicPost />}
        />
        <Route
          path={links.AuthoringAndEditingPageLink}
          element={<AuthoringAndEditing />}
        ></Route>

        <Route
          path={links.UpdatePostAndCommentsLink}
          element={<UpdatePostAndCommentsPage />}
        />
      </Routes>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <BrowserRouter>
        <App></App>
      </BrowserRouter>
    </GlobalContextProvider>
  </React.StrictMode>
);
