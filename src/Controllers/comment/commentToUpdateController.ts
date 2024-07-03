import { GlobalContextTypes, serverRoutes } from "../../globalSettings";

export async function tryFetchCommentDelete(
  _id: string,
  globalVariables: GlobalContextTypes,
  postID: string
) {
  try {
    const response = await fetch(serverRoutes.commentToDeleteRoute, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${globalVariables?.getToken()}`,
      },
      method: "DELETE",
      body: JSON.stringify({ _id, postID }),
    });

    return response;
  } catch (err) {
    console.log(err);
  }
}
