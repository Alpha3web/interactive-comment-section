import Image from "next/image";
import Button from "./button";
import styles from "@/app/page.module.css"


const ReplyEditBtn = ({currentUser, username, onClick, disable, onEditOrReply, id}) => {
    return (
        <div className={styles.btnContainer}>
            {
            currentUser === username ?
                <>
                    <Button
                        onClick={() => onClick(id)}
                        disable={disable}
                        buttonType="button"
                        style={`${styles.btnMedium} ${styles.btnTextRed}`}
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
                        onClick={() => onEditOrReply("update", id)}
                        disable={disable}
                        buttonType="button"
                        style={`${styles.btnMedium} ${styles.btnTextBlue}`}
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
                </> : <Button
                    onClick={() => onEditOrReply("reply", id)}
                    buttonType="button"
                    style={`${styles.btnMedium} ${styles.btnTextBlue}`}
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

export default ReplyEditBtn;