"use client"

const Button = ({onClick, text, buttonType, disable, style}) => {
    return (
        <button onClick={onClick} type={buttonType} className={style} disabled={disable}>
            {text}
        </button>
    )
}

export default Button;