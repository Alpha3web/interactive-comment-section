"use client"

import Image from "next/image";
import styles from "@/app/page.module.css"
import {  imageLoader } from "../lib/client";

const ProfileNav = ({username, currentUser, timePosted, profileImage}) => {

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
            {currentUser === username && <span className={styles.you}>you</span>}
            <p>{timePosted}</p>
            
        </div>
    )
}

export default ProfileNav;
