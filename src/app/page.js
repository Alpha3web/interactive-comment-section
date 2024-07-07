import styles from "./page.module.css";
import Form from "./components/form";
import data from  "@/app/lib/data.json";
import {addComment, createUser, getComments } from "./lib/server";
import { getSavedUser, updateStorage } from "./lib/client";
import CommentWrapper from "./components/comment-wrapper";
import { Suspense } from "react";
import FormWrapper from "./components/form-wrapper";
import PopUp from "./components/popup";


export default async function Home() {
  const comments = await getComments();

  return (
    <main >
      <div>
        <CommentWrapper comments={comments} />
        <FormWrapper style initialValue="" />
      </div>
      {/* <PopUp /> */}
    </main>
  );
}
 