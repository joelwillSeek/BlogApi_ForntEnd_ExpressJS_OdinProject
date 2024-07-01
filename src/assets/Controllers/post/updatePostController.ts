import {
  GlobalContextTypes,
  serverRoutes,
  updatePost,
} from "../../../globalSettings";

export async function fetchIfPostUpdated(
  updatePost: updatePost,
  globalVariable: GlobalContextTypes
) {
  const { title, _id, discription, isPublic } = updatePost;
  try {
    const response = await fetch(serverRoutes.updatePostRoute, {
      headers: {
        Authorization: `${globalVariable?.getToken()}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ title, _id, discription, isPublic }),
    });

    return response;
  } catch (err) {
    console.log(err);
  }
}
