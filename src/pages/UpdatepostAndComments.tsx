import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../ContextProvider";
import UpdatePost from "../components/post/UpdatePost";
import CommentToUpdate from "../components/comment/CommentToUpdate";
import { useNavigate } from "react-router-dom";

export default function UpdatePostAndCommentsPage() {
  const globalVariables = useContext(GlobalContext);
  const navigateTO = useNavigate();

  useEffect(() => {
    if (!globalVariables.isAuthenticated) navigateTO("/");
  }, []);

  const { _id, timecreated, title, discription, isPublic, allCommentsMade } =
    globalVariables.postToBeViewIndividually.posts;

  let [postComment, setPostComment] = useState(allCommentsMade);

  console.log(allCommentsMade);

  return (
    <>
      <div>
        <UpdatePost
          title={title}
          timecreated={timecreated}
          description={discription}
          _id={_id}
          isPublic={isPublic}
        />

        {postComment.map((oneComment) => {
          return (
            <CommentToUpdate
              postID={_id}
              commenterName={oneComment.commenterName}
              comment={oneComment.comment}
              timeStamp={oneComment.timeStamp}
              _id={oneComment._id}
              setPostComment={setPostComment}
              postComment={postComment}
            />
          );
        })}
      </div>
    </>
  );
}
