import React, { MouseEvent, useContext, useRef, useState } from "react";
import { updatePost, updatePostComponents } from "../../globalSettings";
import GlobalContext from "../../ContextProvider";
import { fetchIfPostUpdated } from "../../Controllers/post/updatePostController";
import styles from "../../styles/updatePost.module.css";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function UpdatePost({
  title,
  description,
  timecreated,
  isPublic,
  _id,
}: updatePostComponents) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const discriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const [isPublicValue, setIsPublic] = useState(false);

  const globalVariables = useContext(GlobalContext);

  function isPublicHtmlElement() {
    //<input type="checkbox" checked ref={publicRef} />
    return isPublic ? (
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => {
              setIsPublic(e.target.checked);
            }}
          />
        }
        label="isPublic"
      />
    ) : (
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => {
              setIsPublic(e.target.checked);
            }}
          />
        }
        label="isPublic"
      />
    );
  }

  async function updateClicked(e: MouseEvent) {
    let updatePost: updatePost = {
      _id: _id,
      title: titleRef.current.value,
      discription: discriptionRef.current.value,
      isPublic: isPublicValue,
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
      <div className={styles.formPost}>
        <input
          type="text"
          defaultValue={title}
          ref={titleRef}
          className={styles.blogDiscription}
        />
        <textarea
          className={styles.blogDiscription}
          ref={discriptionRef}
          defaultValue={description}
        ></textarea>

        <div id="aditional info about post">
          {isPublicHtmlElement()}
          <p>{timecreated}</p>
        </div>

        <button className={styles.submitInputBox} onClick={updateClicked}>
          Update
        </button>
      </div>
    </>
  );
}
