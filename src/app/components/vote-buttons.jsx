import Image from "next/image";

const VoteButton = props => {
    const handleClick = () => {
        props.click()
    }
    return (
        <button onClick={handleClick}>
            <Image
                alt={props.alt}
                src={props.src}
                width={15}
                height={props.height}
            />
        </button>
    )
}

export default VoteButton;