import Image from "next/image";
import styles from "@/app/page.module.css"

const EditButton = (props) => {
    const handleClick = () => {
        props.click("update", props.id)
    }

    return (
        <button disabled={props.disable} type="button" onClick={handleClick} className={styles.callToAction}>
            <Image
                alt="edit-icon"
                src="/images/icon-edit.svg"
                width={15}
                height={15}
            />
            Edit
        </button>
    )
}

export default EditButton;