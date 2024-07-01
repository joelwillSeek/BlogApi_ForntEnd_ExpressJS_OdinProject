import React, { MouseEvent, useContext, useEffect, useState } from "react";
import image from "../user.png";
import GlobalContext from "../../ContextProvider";
import { useNavigate } from "react-router-dom";
import {
  postReciveTypes,
  serverPath,
  serverRoutes,
} from "../../globalSettings";
import Post from "../../components/Post";

export default function PublicPostPage() {
  const auth = useContext(GlobalContext);
  const navigateTO = useNavigate();

  let [allPublcPosts, setAllPublicPosts] = useState<{
    posts: Array<postReciveTypes>;
  } | null>(null);

  useEffect(() => {
    if (!auth?.isAuthenticated) navigateTO("/");
    getAllPublicPosts();
  }, []);

  function goToAuthoring(e: MouseEvent) {
    navigateTO("/author");
  }

  function logOutClick(e: MouseEvent) {
    auth?.logout();
    navigateTO("/");
  }

  async function getAllPublicPosts() {
    try {
      const response = await fetch(serverRoutes.allPostsRoute, {
        method: "GET",
        headers: {
          Authorization: `${auth?.getToken()}`,
        },
      });

      const responseJSON = await response.json();

      console.log(responseJSON);

      await setAllPublicPosts(responseJSON);

      console.table(responseJSON);

      console.log("all users: ", responseJSON);
    } catch (err) {
      alert("Error Because of :" + err);
      console.error("Error when getting all user posts: ", err);
    }
  }

  return (
    <>
      {/* im picuring a cirulare pertruding out profile pic */}
      <div className="w-full">
        <img src={image} alt="profile pic" />
        <button className="bg-blue-700 hover:bg-red-600" onClick={logOutClick}>
          log out
        </button>
        <button
          className="bg-black hover:bg-green-500 transition"
          onClick={goToAuthoring}
        >
          Author
        </button>
      </div>

      {allPublcPosts != null
        ? allPublcPosts.posts.map((post, index) => {
            console.log("description", post.discription);
            return (
              <Post
                _id={post._id}
                key={index}
                title={post.title}
                allCommentsMade={post.allCommentsMade}
                discription={post.discription}
                timecreated={post.timecreated}
                isPublic={post.isPublic}
                seenInPublicPage={true}
                updateable={false}
              />
            );
          })
        : null}
    </>
  );
}
