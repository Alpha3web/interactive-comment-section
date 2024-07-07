import { useFormStatus } from "react-dom"
import styles from "@/app/page.module.css";

const SubmitButton = ({click, id, innerText}) => {
    const {pending} = useFormStatus();

    const handleClick = () => {
        click(preVal => {
            return {...preVal, userId: id}
        })
    }

    return (
        <button  onClick={handleClick} type="submit" className={styles.button} disabled={pending}>
            {innerText? innerText: "Send"}
        </button>
    )
}

export default SubmitButton;