import React, {
  useContext,
  useRef,
  MouseEvent,
  useState,
  useEffect,
} from "react";
import GlobalContext from "../../ContextProvider";
import { useNavigate } from "react-router-dom";
import { postReciveTypes, serverPath } from "../../globalSettings";
import Post from "../../components/Post";
import {
  fetchCreatePost,
  getAllUserPosts,
} from "../Controllers/authoringAndEditingController";

export function AuthoringAndEditing() {
  const auth = useContext(GlobalContext);
  const navigateTO = useNavigate();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const discriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const publicRef = useRef<HTMLInputElement | null>(null);
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
    const isPublic = publicRef.current.checked;

    const newPost: postReciveTypes = {
      title: title,
      _id: "s",
      allCommentsMade: [],
      isPublic: isPublic,
      timecreated: Date.now().toString(),
      discription: discription,
      seenInPublicPage: false,
      updateable: true,
    };

    getALLUserPostsStored.posts.push(newPost);
    setGetALLUserPostsStored({ posts: [...getALLUserPostsStored.posts] });
  }

  async function createOrEditPost(e: MouseEvent) {
    e.preventDefault();
    const titleElement = titleRef.current;
    const discriptionElement = discriptionRef.current;
    const publicElement = publicRef.current;

    if (
      titleElement?.value.trim() == "" ||
      discriptionElement?.value.trim() == ""
    )
      return;

    try {
      const response = await fetchCreatePost(
        titleElement,
        discriptionElement,
        publicElement,
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
      {displayAllUserPostsStored()}
      <form>
        <input
          type="text"
          placeholder="Write Title Here ...."
          name="title"
          ref={titleRef}
        />
        <textarea
          name="discription"
          placeholder="Write Your Blog ...."
          ref={discriptionRef}
        ></textarea>
        <label htmlFor="public">Public</label>
        <input
          type="checkbox"
          id="public"
          name="isPublic"
          value={"true"}
          ref={publicRef}
        />
        <input type="submit" value={"Submit"} onClick={createOrEditPost} />
      </form>
    </>
  );
}
