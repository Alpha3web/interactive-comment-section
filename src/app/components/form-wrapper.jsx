"use client"

import Image from "next/image";
import styles from "@/app/page.module.css"
import { getRandomUser, getUserOrCreate } from "../lib/server";
import { getSavedUser, updateStorage, imageLoader } from "../lib/client";
import { useEffect, useState, cache } from "react";
import Form from "./form";

const cachedData = cache(async (param) => {
  const returnedUser = await getUserOrCreate(param);
  return returnedUser;
});

const FormWrapper = (props) => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const [name] = getSavedUser()
    if (!name) {
      getRandomUser().then(rand => {
        console.log(rand);
        if (rand){
          updateStorage(rand);
          cachedData(rand).then(user =>  {
            setCurrentUser(user)
          });
        }
      });
    } else {
      cachedData(getSavedUser()).then(user =>  {
        setCurrentUser(user)
      });
    }  
  }, []);

  return (
    <div className={styles.formWrapper}>
      <Image
        alt="profile-image"
        loader={imageLoader}
        src={currentUser.profileImage || "https://s.clipartkey.com/mpngs/s/62-620518_clipart-abstract-user-icon-small-user-icon-png.png"}
        width={50} height={50}
        priority
        unoptimized
      />
      <Form 
        role={props.role} 
        hideForm={props.hideForm}
        targetId={props.targetId}
        initialValue={props.initialValue}
        userId={currentUser && currentUser._id}
      />
    </div>
  )
}

export default FormWrapper;
