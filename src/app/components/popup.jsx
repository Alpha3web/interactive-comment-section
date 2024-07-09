/* eslint-disable react/no-unescaped-entities */
import { forwardRef } from "react";
import styles from "@/app/page.module.css"
import Button from "./button";
import { deleteComment } from "../lib/server";


export default forwardRef(
    function Popup({ referencedId }, ref) {
        const cancelDelete = () => {
            ref.current.classList.add(styles.hidden);
        };
        const handleDelete = () => {
            deleteComment(referencedId.current).then(() => {
                ref.current.classList.add(styles.hidden);
            });
        }

        return (
            <div ref={ref} className={`${styles.popUpWrapper} ${styles.hidden}`}>
                <div className={styles.popUp}>
                    <h1>Delete comment</h1>
                    <p>Are you sure you want to delete this comment?
                        This will remove this comment and can't be undone.
                    </p>
                    <Button style={`${styles.btnLarge} ${styles.btnRed}`} buttonType="button" onClick={cancelDelete} text="NO, CANCEL" />
                    <Button buttonType="button" style={`${styles.btnLarge} ${styles.btnGray}`} onClick={handleDelete} text="YES, DELETE" />
                </div>
            </div>
        )
    }
);