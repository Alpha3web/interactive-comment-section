"use client"

import Comment from "./comment";
import styles from "@/app/page.module.css"
import { useRef, useState } from "react";
import FormWrapper from "./form-wrapper";
import PopUp from "./popup";



const CommentWrapper = (props) => {
  const popUpRef = useRef(null);
  const idRef = useRef("");
  const [clickedCommentId, setClickedCommentId] = useState({currentRole: "", currentId: ""});

  const handleEditOrReply = (role, id) => setClickedCommentId({currentRole: role, currentId: id});
  const handleClick = id => {
    const [_, hidden] = popUpRef.current.classList;
    popUpRef.current.classList.remove(hidden);
    idRef.current = id;
  }

  const comments = props.comments;

  return (
    <>
      {comments.map(comment => {
        return (
          <div key={comment._id} className={styles.mainComment}>
            <Comment
              id={comment._id}
              content={comment.content}
              userDetails={comment.author}
              postedAt={comment.createdAt}
              currentScore={comment.score}
              onEditOrReply={handleEditOrReply}
              role={clickedCommentId.currentId === comment._id && 
                clickedCommentId.currentRole==="update" && 
                clickedCommentId.currentRole}
              onClick={handleClick}
            />
            <div className={styles.replies}>
              {clickedCommentId.currentId === comment._id && clickedCommentId.currentRole==="reply" &&
                <FormWrapper 
                  role={clickedCommentId.currentRole} 
                  hideForm={handleEditOrReply}
                  targetId={comment._id}
                  initialValue={"@" + comment.author.username + " "} 
                /> }
              
              {comment.replies.map(reply => {
                return (
                  <div key={reply._id}>
                    <Comment                   
                    id={reply._id}
                    content={reply.content}
                    userDetails={reply.author}
                    postedAt={reply.createdAt}
                    currentScore={reply.score}
                    onEditOrReply={handleEditOrReply}
                    role={clickedCommentId.currentId === reply._id && 
                      clickedCommentId.currentRole==="update" && 
                      clickedCommentId.currentRole}
                    onClick={handleClick}
                    />
                    {clickedCommentId.currentId === reply._id && clickedCommentId.currentRole==="reply" && 
                      <FormWrapper role={clickedCommentId.currentRole} 
                        hideForm={handleEditOrReply} 
                        initialValue={ "@" + reply.author.username + " "} 
                        targetId={reply._id}
                      />
                    }
                  </div>
                )
              })
              }
            </div>
          </div>
        )
      })
      }
      <PopUp referencedId={idRef} ref={popUpRef} />
    </>
  )
}

export default CommentWrapper;

