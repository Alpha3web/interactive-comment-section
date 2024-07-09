"use client"

import VotesCount from "./votes-counts";
import ProfileNav from "./profile-nav";
import styles from "@/app/page.module.css"
import Form from "./form";
import { useEffect, useState } from "react";
import { dateConverter, getSavedUser } from "../lib/client";
import ReplyEditBtn from "./reply-edit";

const Comment = (props) => {
    const { username, profileImage } = props.userDetails;
    const [time, updateTime] = useState(dateConverter(props.time));
    const [currentUser, setCurrentUser] = useState("")

    useEffect(() => {
        const intervalID = setInterval(() => {
            updateTime(dateConverter(props.time));
        }, 1000);
        const [currentUser] = getSavedUser();
        setCurrentUser(currentUser)
        return () => clearInterval(intervalID);

    }, [props.time])

    return (
        <div className={styles.comment}>
            <VotesCount
                id={props.id}
                currentScore={props.currentScore}
            />
            <ProfileNav
                username={username}
                timePosted={time}
                profileImage={profileImage}
                currentUser={currentUser}
            />
            <ReplyEditBtn
                id={props.id}
                currentUser={currentUser}
                username={username}
                onClick={props.onClick}
                disable={props.role? true: false}
                onEditOrReply={props.onEditOrReply}
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