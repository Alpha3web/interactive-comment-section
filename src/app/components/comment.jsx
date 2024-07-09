"use client"

import VotesCount from "./votes-counts";
import ProfileNav from "./profile-nav";
import styles from "@/app/page.module.css"
import Form from "./form";
import { useEffect, useState } from "react";
import { dateConverter, getSavedUser } from "../lib/client";
import ReplyEditBtn from "./reply-edit";

const Comment = ({userDetails, postedAt, id, currentScore, onClick, role, onEditOrReply, content}) => {
    const { username, profileImage } = userDetails;
    const [time, updateTime] = useState(dateConverter(postedAt));
    const [currentUser, setCurrentUser] = useState("")

    useEffect(() => {
        const intervalID = setInterval(() => {
            updateTime(dateConverter(postedAt));
        }, 1000);
        const [currentUser] = getSavedUser();
        setCurrentUser(currentUser)
        return () => clearInterval(intervalID);

    }, [postedAt])

    const tag = content.startsWith("@")? content.split(" ")[0]: null;
    const actualContent = tag? content.slice(tag.length + 1) : content

    return (
        <div className={styles.comment}>
            <VotesCount
                commentId={id}
                currentScore={currentScore}
            />
            <ProfileNav
                username={username}
                timePosted={time}
                profileImage={profileImage}
                currentUser={currentUser}
            />
            <ReplyEditBtn
                id={id}
                currentUser={currentUser}
                username={username}
                onClick={onClick}
                disable={role? true: false}
                onEditOrReply={onEditOrReply}
            />
            {role? 
                <Form
                    role={role} 
                    hideForm={onEditOrReply}
                    targetId={id}
                    initialValue={content}
                />:<p>
                    <span>{tag && tag + " "}</span>
                    {actualContent.length > 0 && actualContent[0].toUpperCase() + actualContent.slice(1)}
                    </p>
            }
        </div>
    )

}

export default Comment;