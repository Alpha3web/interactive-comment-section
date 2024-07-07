import { useFormStatus } from "react-dom"
import styles from "@/app/page.module.css";
import Button from "./button";

const SubmitButton = ({click, id, innerText}) => {
    const {pending} = useFormStatus();

    const handleClick = () => {
        click(preVal => {
            return {...preVal, userId: id}
        })
    }

    return (
        <Button 
            style={`${styles.btnLarge} ${styles.btnBlue}`}
            onClick={handleClick}
            buttonType="submit"
            disable={pending}
            text={innerText? innerText: "Send"}
        />
    )
}

export default SubmitButton;