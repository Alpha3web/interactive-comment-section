import Image from "next/image";
import styles from "@/app/page.module.css"

const ReplyButton = (props) => {
    const handleClick = () => {
        props.click("reply", props.id)
    }

    return (
        <button type="button" onClick={handleClick} className={styles.callToAction}>
            <Image
                alt="reply-icon"
                src="/images/icon-reply.svg"
                width={15}
                height={15}
            />
            Reply
        </button>
    )
}

export default ReplyButton;