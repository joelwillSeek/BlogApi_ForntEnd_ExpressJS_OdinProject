import { Dispatch, SetStateAction } from "react";

export const serverPath = "http://localhost:3001";

export const serverRoutes = {
  updatePostRoute: serverPath + "/post/updateAPost",
  allPostsRoute: serverPath + "/post/allPosts",
  commentToDeleteRoute: serverPath + "/post/deletePostComment",
};

//Types

export type updatePostComponents = {
  title: string;
  description: string;
  timecreated: string;
  isPublic: boolean;
  _id: string;
};

export type updatePost = {
  title: string;
  _id: string;
  discription: string;
  isPublic: boolean;
};

export type commentTypes = {
  commenterName: string;
  _id: string;
  comment: string;
  timeStamp: string;
};

export const links = {
  SignUpPageLink: "/signUp",
  LogInPageLink: "/",
  PublicPostPageLink: "/publicPost",
  SeenMoreOfPublicPostPageLink: "/seenMoreOfPublicPost",
  AuthoringAndEditingPageLink: "/author",
  UpdatePostAndCommentsLink: "/updatePostAndComment",
};

export type postReciveTypes = {
  title: string;
  _id: string;
  allCommentsMade: Array<commentTypes>;
  isPublic: boolean;
  timecreated: string;
  discription: string;
  seenInPublicPage: boolean;
  updateable: boolean;
};

export type GlobalContextTypes = {
  postToBeViewIndividually: {
    posts: postReciveTypes | null;
  };
  setPostToBeViewIndividually: Dispatch<
    SetStateAction<{
      posts: postReciveTypes | null;
    }>
  >;
  isAuthenticated: Boolean;
  login: (token: string) => void;
  logout: () => void;
  getToken: () => string | null;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
} | null;
