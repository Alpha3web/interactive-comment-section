"use client"

import Image from "next/image";
import styles from "@/app/page.module.css"
import { useEffect, useState } from "react";
import { dateConverter, getSavedUser, imageLoader } from "../lib/client";
import Button from "./button";

const Bar = props => {

    const { username, profileImage } = props.user;
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
            {currentUser === username && <p className={styles.you}>You</p>}
            <p>{time}</p>
            {
                currentUser === username ?
                    <div>
                        <Button
                            onClick={() => props.onClick(props.id)}
                            disable={props.disable}
                            buttonType="button"
                            style={styles.btnMedium}
                            text={
                                <>
                                    <Image
                                        alt="delete-icon"
                                        src="/images/icon-delete.svg"
                                        width={15}
                                        height={15}
                                    /> <span>Delete</span>
                                </>
                            }
                        />
                        <Button
                            onClick={() => props.onEditOrReply("update", props.id)}
                            disable={props.disable}
                            buttonType="button"
                            style={styles.btnMedium}
                            text={
                                <>
                                    <Image
                                        alt="edit-icon"
                                        src="/images/icon-edit.svg"
                                        width={15}
                                        height={15}
                                    /> <span>Edit</span>
                                </>
                            }
                        />
                    </div> : <Button
                        onClick={() => props.onEditOrReply("reply", props.id)}
                        buttonType="button"
                        style={styles.btnMedium}
                        text={
                            <>
                                <Image
                                    alt="reply-icon"
                                    src="/images/icon-reply.svg"
                                    width={15}
                                    height={15}
                                /> <span>Reply</span>
                            </>
                        }
                    />
            }
        </div>
    )
}

export default Bar;
