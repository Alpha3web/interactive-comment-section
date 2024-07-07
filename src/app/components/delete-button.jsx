import Image from "next/image";
import styles from "@/app/page.module.css"
import { deleteComment } from "../lib/server";

const DeleteButton = (props) => {
    const handleClick = () => {
        props.onClick(props.id);
    }

    return (
        <button disabled={props.disable} type="button" onClick={handleClick} className={styles.callToAction}>
            <Image
                alt="delete-icon"
                src="/images/icon-delete.svg"
                width={15}
                height={15}
            />
            Delete
        </button>
    )
}

export default DeleteButton;