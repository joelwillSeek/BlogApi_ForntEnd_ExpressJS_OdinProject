import React from "react";
import { commentTypes } from "../../globalSettings";

export default function Comments({
  commenterName,
  comment,
  timeStamp,
}: commentTypes) {
  return (
    <>
      <div>
        <h1>{commenterName}</h1>
        <p>{comment}</p>
        <p>{timeStamp}</p>
      </div>
    </>
  );
}
