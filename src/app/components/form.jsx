"use client"

import styles from "@/app/page.module.css"
import { addComment, addReply, editComment } from "../lib/server";
import { useState } from "react";
import SubmitButton from "./submit";
import Input from "./input";


const Form = ({initialValue, targetId, userId, hideForm, role}) => {
  const [inputFields, setInputFields] = useState({
    content: initialValue,
    userId: "",
    targetId: targetId
  })

  const handleChange = (e) => {
    const value = e.target.value
    setInputFields(preVal => {
      return {...preVal, content: value}
    })
  }

  const handleSubmit = () => {
    setInputFields(preVal => {
      return {...preVal, content: ""}
    });
    hideForm && hideForm("");
  }

  let formAction = addComment;

  if(role === "reply") {
    formAction = addReply;
  } else if (role === "update") {
    formAction = editComment;
  };
  
  return (
    <form onSubmit={handleSubmit} action={formAction} className={role === "update"? styles.editForm: undefined}>
      <textarea onChange={handleChange} value={inputFields.content} name="content" cols="30" rows="3"></textarea>
      <Input name="userId" value={inputFields.userId} />
      <Input name="targetId" value={inputFields.targetId} />
      <SubmitButton innerText={role && role[0].toUpperCase() + role.slice(1)} click={setInputFields} id={userId}/>
    </form>
  )
}

export default Form;
