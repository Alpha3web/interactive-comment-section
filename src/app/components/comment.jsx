"use client"

import VotesCount from "./votes-counts";
import Bar from "./bar";
import styles from "@/app/page.module.css"
import Form from "./form";

const Comment = (props) => {
    return (
        <div className={styles.comment}>
            <Bar
                id={props.id}
                user={props.userDetails}
                timePosted={props.time}
                onEditOrReply={props.onEditOrReply}
                disable={props.role? true: false}
                onClick={props.onClick}
            />
            <VotesCount
                id={props.id}
                currentScore={props.currentScore}
            />
            {props.role? 
                <Form
                    role={props.role} 
                    hideForm={props.onEditOrReply}
                    targetId={props.id}
                    initialValue={props.content}
                />:<p>{props.content}</p>
            }
          
        </div>
    )

}

export default Comment;