import React, { MouseEvent, useContext } from "react";
import { postReciveTypes } from "../globalSettings";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../ContextProvider";
import { links } from "../globalSettings";
import styles from "../styles/post.module.css";
import { Checkbox } from "@mui/material";

export default function Post({
  title,
  discription,
  timecreated,
  isPublic,
  _id,
  allCommentsMade,
  seenInPublicPage,
  updateable,
}: postReciveTypes) {
  const navigateTo = useNavigate();

  const globalVariables = useContext(GlobalContext);

  function isPublicHtmlElement() {
    // <input type="checkbox" disabled checked />

    return isPublic ? (
      <Checkbox aria-label="isPublic" defaultChecked disabled />
    ) : (
      <Checkbox aria-label="isPublic" disabled />
    );
  }

  function updateClicked() {
    const posts = {
      title: title,
      _id: _id,
      discription: discription,
      timecreated: timecreated,
      isPublic: isPublic,
      allCommentsMade: allCommentsMade,
      seenInPublicPage: seenInPublicPage,
      updateable: false,
    };

    globalVariables.setPostToBeViewIndividually({ posts });
    navigateTo(links.UpdatePostAndCommentsLink);
  }

  function showSeeMoreOrUpdateButton() {
    if (seenInPublicPage)
      return (
        <button className={styles.submitInputBox} onClick={seeMoreClick}>
          See More
        </button>
      );
    if (updateable)
      return (
        <button className={styles.submitInputBox} onClick={updateClicked}>
          Update
        </button>
      );
  }

  function seeMoreClick(e: MouseEvent) {
    const posts = {
      title: title,
      _id: _id,
      discription: discription,
      timecreated: timecreated,
      isPublic: isPublic,
      allCommentsMade: allCommentsMade,
      seenInPublicPage: seenInPublicPage,
      updateable: false,
    };

    globalVariables.setPostToBeViewIndividually({ posts });
    navigateTo("/seenMoreOfPublicPost");
  }

  return (
    <>
      <div className={styles.card}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.discriptionText}>{discription}</p>
        <div className={styles.group}>
          {isPublicHtmlElement()}
          <p>{timecreated}</p>
        </div>
        <div className={styles.centeringButtons}>
          {showSeeMoreOrUpdateButton()}
        </div>
      </div>
    </>
  );
}
