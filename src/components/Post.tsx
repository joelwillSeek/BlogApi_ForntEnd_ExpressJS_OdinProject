import React, { MouseEvent, useContext } from "react";
import { postReciveTypes } from "../globalSettings";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../ContextProvider";
import { links } from "../globalSettings";

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
    return isPublic ? (
      <input type="checkbox" disabled checked />
    ) : (
      <input type="checkbox" disabled />
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
      return <button onClick={seeMoreClick}>See More</button>;
    if (updateable) return <button onClick={updateClicked}>Update</button>;
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
      <div className="p-5">
        <div>
          <h1>{title}</h1>
          <p>{discription}</p>
          <div id="aditional info about post">
            {isPublicHtmlElement()}
            <p>{timecreated}</p>
          </div>
          {showSeeMoreOrUpdateButton()}
        </div>
      </div>
    </>
  );
}
