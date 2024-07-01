import React, { MouseEvent, useContext } from "react";
import { commentTypes } from "../../globalSettings";
import { tryFetchCommentDelete } from "../../assets/Controllers/comment/commentToUpdateController";
import GlobalContext from "../../ContextProvider";

export default function CommentToUpdate({
  commenterName,
  comment,
  timeStamp,
  _id,
  postID,
}: {
  commenterName: string;
  comment: string;
  timeStamp: string;
  _id: string;
  postID: string;
}) {
  const globalVariables = useContext(GlobalContext);

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
