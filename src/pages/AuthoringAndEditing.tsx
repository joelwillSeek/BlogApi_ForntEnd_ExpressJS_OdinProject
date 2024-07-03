import React, {
  useContext,
  useRef,
  MouseEvent,
  useState,
  useEffect,
} from "react";
import GlobalContext from "../ContextProvider";
import { useNavigate } from "react-router-dom";
import { postReciveTypes, serverPath } from "../globalSettings";
import Post from "../components/Post";
import {
  fetchCreatePost,
  getAllUserPosts,
} from "../Controllers/authoringAndEditingController";
import styles from "../styles/authoringAndEditing.module.css";
import { Checkbox, FormControlLabel } from "@mui/material";
import date from "date-and-time";

export function AuthoringAndEditing() {
  const auth = useContext(GlobalContext);
  const navigateTO = useNavigate();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const discriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  let [getALLUserPostsStored, setGetALLUserPostsStored] = useState<null | {
    posts: Array<postReciveTypes>;
  }>(null);

  useEffect(() => {
    if (!auth?.isAuthenticated) return navigateTO("/");
    getAllUserPosts(setGetALLUserPostsStored, auth);
  }, []);

  function allTheNewPostToUi() {
    const title = titleRef.current.value;
    const discription = discriptionRef.current.value;

    const newPost: postReciveTypes = {
      title: title,
      _id: "s",
      allCommentsMade: [],
      isPublic: isPublic,
      timecreated: date.format(new Date(), "YYYY/MM/SS hh:mm:ss"),
      discription: discription,
      seenInPublicPage: false,
      updateable: true,
    };

    getALLUserPostsStored.posts.push(newPost);
    setGetALLUserPostsStored({ posts: [...getALLUserPostsStored.posts] });
    clearFormInputs();
  }

  function clearFormInputs() {
    titleRef.current.value = "";
    discriptionRef.current.value = "";
  }

  async function createOrEditPost(e: MouseEvent) {
    e.preventDefault();
    const titleElement = titleRef.current;
    const discriptionElement = discriptionRef.current;

    if (
      titleElement?.value.trim() == "" ||
      discriptionElement?.value.trim() == ""
    )
      return;

    try {
      const response = await fetchCreatePost(
        titleElement,
        discriptionElement,
        isPublic,
        auth
      );

      console.log(response);

      if (response.ok) {
        alert("Post Created");
      }

      allTheNewPostToUi();
    } catch (err) {
      console.log(err);
      alert("error: " + err);
    }
  }

  function displayAllUserPostsStored() {
    return getALLUserPostsStored != null
      ? getALLUserPostsStored.posts.map((post, index) => {
          return (
            <Post
              _id={post._id}
              key={index}
              title={post.title}
              allCommentsMade={post.allCommentsMade}
              discription={post.discription}
              timecreated={post.timecreated}
              isPublic={post.isPublic}
              seenInPublicPage={false}
              updateable={true}
            />
          );
        })
      : null;
  }

  return (
    <>
      <form className={styles.formPost}>
        <h1 className={styles.headerText}>For Post</h1>
        <input
          className={styles.blogDiscription}
          type="text"
          placeholder="Write Title Here ...."
          name="title"
          ref={titleRef}
        />
        <textarea
          className={styles.blogDiscription}
          name="discription"
          placeholder="Write Your Blog ...."
          ref={discriptionRef}
        ></textarea>

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

        <input
          className={styles.submitInputBox}
          type="submit"
          value={"Submit"}
          onClick={createOrEditPost}
        />
      </form>

      <div className={styles.centerGrid}>
        <div className={styles.gridForPost}>{displayAllUserPostsStored()}</div>
      </div>
    </>
  );
}
