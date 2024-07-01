import React, { MouseEvent, useContext, useRef } from "react";
import { updatePost, updatePostComponents } from "../../globalSettings";
import { fetchIfPostUpdated } from "../../assets/Controllers/post/updatePostController";
import GlobalContext from "../../ContextProvider";

export default function UpdatePost({
  title,
  description,
  timecreated,
  isPublic,
  _id,
}: updatePostComponents) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const discriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const publicRef = useRef<HTMLInputElement | null>(null);

  const globalVariables = useContext(GlobalContext);

  function isPublicHtmlElement() {
    return isPublic ? (
      <input type="checkbox" checked ref={publicRef} />
    ) : (
      <input type="checkbox" ref={publicRef} />
    );
  }

  async function updateClicked(e: MouseEvent) {
    let updatePost: updatePost = {
      _id: _id,
      title: titleRef.current.value,
      discription: discriptionRef.current.value,
      isPublic: publicRef.current.checked,
    };

    try {
      console.log(updatePost);
      const response = await fetchIfPostUpdated(updatePost, globalVariables);

      if (response.status != 200) {
        alert("Error: " + response.statusText);
        console.error(
          "Error",
          response.status,
          " Error Text ",
          response.statusText
        );
      } else {
        alert("Post Updated");
      }
    } catch (Error) {
      console.log("Error: ", Error);
    }
  }

  return (
    <>
      <div className="p-5">
        <input type="text" defaultValue={title} ref={titleRef} />
        <textarea ref={discriptionRef} defaultValue={description}></textarea>

        <div id="aditional info about post">
          {isPublicHtmlElement()}
          <p>{timecreated}</p>
        </div>

        <button onClick={updateClicked}>Update</button>
      </div>
    </>
  );
}
