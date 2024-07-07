"use client"

import Image from "next/image";
import styles from "@/app/page.module.css"
import { useEffect, useState } from "react";
import { dateConverter, getSavedUser, imageLoader } from "../lib/client";
import ReplyButton from "./reply-button";
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";

const Bar = props => {

    const {username, profileImage} = props.user;
    const [time, updateTime] = useState(dateConverter(props.timePosted));
    const [currentUser, setCurrentUser] = useState("")

    useEffect(() => {
        const intervalID = setInterval(() => {
            updateTime(dateConverter(props.timePosted));
        }, 1000);
        const [currentUser] = getSavedUser();
        setCurrentUser(currentUser)
        return () => clearInterval(intervalID);

    }, [props.timePosted])


    return (
        <div className={styles.bar}>
            <Image
                className={styles.profileImage}
                loader={imageLoader}
                alt="profile-image"
                src={profileImage}
                width={55}
                height={50}
                priority
                unoptimized
            />
            <span>{username}</span>
            {currentUser === username && <p>You</p>}
            <p>{time}</p>
            {
            currentUser === username?
            <div>
                <DeleteButton onClick={props.onClick} disable={props.disable} id={props.id}/>
                <EditButton disable={props.disable} click={props.onEditOrReply} id={props.id}/>
            </div> : <ReplyButton click={props.onEditOrReply} id={props.id} />
            }
        </div>
    )
}

export default Bar;
