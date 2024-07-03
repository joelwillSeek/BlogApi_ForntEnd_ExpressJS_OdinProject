import React, {
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { commentTypes, serverPath } from "../globalSettings";
import Post from "../components/Post";
import GlobalContext from "../ContextProvider";
import Comments from "../components/comment/Comments";
import { useNavigate } from "react-router-dom";

export default function SeeMoreOfPublicPost() {
  let textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const auth = useContext(GlobalContext);

  let { title, _id, discription, timecreated, isPublic, allCommentsMade } =
    auth.postToBeViewIndividually.posts;

  let [commentUpToDate, setCommentUpToDate] =
    useState<Array<commentTypes> | null>(allCommentsMade);

  let navigateTO = useNavigate();

  useEffect(() => {
    if (!auth?.isAuthenticated) return navigateTO("/");
  }, []);

  function attackCommentToUi() {
    const textAreaElement = textAreaRef.current;
    const newComment: commentTypes = {
      _id: "",
      comment: textAreaElement.value,
      commenterName: auth.userName,
      timeStamp: Date.now().toString(),
    };

    setCommentUpToDate([...commentUpToDate, newComment]);
  }

  async function onCommentButtonClicked(e: MouseEvent) {
    const textAreaElement = textAreaRef.current;

    try {
      const response = await fetch(`${serverPath + "/post/commentOnPost"}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${auth?.getToken()}`,
        },
        method: "POST",
        body: JSON.stringify({
          postID: _id,
          comment: textAreaElement.value,
          commenterName: auth.userName,
        }),
      });

      if (response.ok) {
        attackCommentToUi();
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (err) {
      console.log(err);
      alert("Error: " + err);
    }
  }

  return (
    <>
      {/* The Post */}
      <Post
        title={title}
        _id={_id}
        discription={discription}
        timecreated={timecreated}
        seenInPublicPage={false}
        isPublic={isPublic}
        allCommentsMade={allCommentsMade}
        updateable={false}
      />

      <div>
        <textarea placeholder="Comment Here ..." ref={textAreaRef}></textarea>
        <button onClick={onCommentButtonClicked}>Comment</button>
      </div>

      {commentUpToDate.map((oneOfTheComment, index) => {
        return (
          <Comments
            _id=""
            key={index}
            commenterName={oneOfTheComment.commenterName}
            comment={oneOfTheComment.comment}
            timeStamp={oneOfTheComment.timeStamp}
          />
        );
      })}
    </>
  );
}
