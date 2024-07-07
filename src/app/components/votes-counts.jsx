"use client"

import Image from "next/image";
import styles from "@/app/page.module.css"
import { useEffect, useState } from "react";
import { updateScore } from "../lib/server";
import Button from "./button";

const VotesCount = props => {
    const [votes, setVotes] = useState(props.currentScore);
    
    const increaseVotes = () => setVotes(votes + 1);
    const decreaseVotes = () => setVotes(votes - 1);
    
    useEffect(() => {
        updateScore(props.id, votes);
    }, [props.id, votes])


    return (
        <div className={styles.votesCount}>
            <Button
                style={styles.voteBtn}
                onClick={increaseVotes}
                text={<Image
                    alt="plus icon"
                    src="/images/icon-plus.svg"
                    width={15}
                    height={15}
                />}
            />
            <span>{votes}</span>
            <Button
                style={styles.voteBtn}
                onClick={decreaseVotes}
                text={<Image
                    alt="minus icon"
                    src="/images/icon-minus.svg"
                    width={15}
                    height={5}
                />}
            />
        </div>
    )
}

export default VotesCount;