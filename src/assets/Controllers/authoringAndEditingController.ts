import { Dispatch, SetStateAction, useContext } from "react";
import {
  GlobalContextTypes,
  postReciveTypes,
  serverPath,
} from "../../globalSettings";

export async function getAllUserPosts(
  setGetALLUserPostsStored: Dispatch<
    SetStateAction<{
      posts: Array<postReciveTypes>;
    }>
  >,
  auth: GlobalContextTypes
) {
  try {
    const response = await fetch(`${serverPath + "/post/getUserPost"}`, {
      method: "GET",
      headers: {
        Authorization: `${auth?.getToken()}`,
      },
    });

    const responseJSON = await response.json();

    setGetALLUserPostsStored(responseJSON);

    console.log("all users: ", responseJSON);
  } catch (err) {
    alert("Error Because of :" + err);
    console.error("Error when getting all user posts: ", err);
  }
}

export async function fetchCreatePost(
  titleElement: HTMLInputElement,
  discriptionElement: HTMLTextAreaElement,
  publicElement: HTMLInputElement,
  auth: GlobalContextTypes
) {
  const response = await fetch(`${serverPath + "/post/createAPost"}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${auth?.getToken()}`,
    },
    body: JSON.stringify({
      title: titleElement?.value,
      discription: discriptionElement?.value,
      isPublic: publicElement?.checked,
    }),
  });

  if (!response.ok) {
    alert(
      "faild due to " + response.statusText + " And Code: " + response.status
    );
    return;
  }

  return response;
}
