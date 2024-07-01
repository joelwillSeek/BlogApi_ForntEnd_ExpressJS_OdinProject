import React, { useContext } from "react";
import GlobalContext from "../../ContextProvider";
import UpdatePost from "../../components/post/UpdatePost";
import CommentToUpdate from "../../components/comment/CommentToUpdate";

export default function UpdatePostAndCommentsPage() {
  const globalVariables = useContext(GlobalContext);

  const { _id, timecreated, title, discription, isPublic, allCommentsMade } =
    globalVariables.postToBeViewIndividually.posts;

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

        {allCommentsMade.map((oneComment) => {
          return (
            <CommentToUpdate
              postID={_id}
              commenterName={oneComment.commenterName}
              comment={oneComment.comment}
              timeStamp={oneComment.timeStamp}
              _id={oneComment._id}
            />
          );
        })}
      </div>
    </>
  );
}
