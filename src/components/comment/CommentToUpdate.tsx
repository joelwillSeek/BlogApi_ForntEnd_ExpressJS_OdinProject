import React, { Dispatch, MouseEvent, SetStateAction, useContext } from "react";
import { commentTypes } from "../../globalSettings";
import GlobalContext from "../../ContextProvider";
import { tryFetchCommentDelete } from "../../Controllers/comment/commentToUpdateController";

export default function CommentToUpdate({
  commenterName,
  comment,
  timeStamp,
  _id,
  postID,
  setPostComment,
  postComment,
}: {
  commenterName: string;
  comment: string;
  timeStamp: string;
  _id: string;
  postID: string;
  postComment: commentTypes[];
  setPostComment: Dispatch<SetStateAction<commentTypes[]>>;
}) {
  const globalVariables = useContext(GlobalContext);

  function removeTheComment() {
    const withOutThisComment = postComment.filter(
      (oneComment) => oneComment._id != _id
    );
    setPostComment([...withOutThisComment]);
  }

  async function deleteClicked(e: MouseEvent) {
    try {
      const response = await tryFetchCommentDelete(
        _id,
        globalVariables,
        postID
      );

      if (response.status != 200) {
        console.log("Did not delete");
      } else {
        removeTheComment();
        alert("Comment Deleted");
      }
    } catch (Err) {
      console.log(Err);
    }
  }

  return (
    <>
      <div>
        <h1>{commenterName}</h1>
        <p>{comment}</p>
        <p>{timeStamp}</p>
        <button onClick={deleteClicked}>Delete</button>
      </div>
    </>
  );
}
