"use client"

import Image from "next/image";
import styles from "@/app/page.module.css"
import { useEffect, useState } from "react";
import VoteButton from "./vote-buttons";
import { updateScore } from "../lib/server";

const VotesCount = props => {
    const [votes, setVotes] = useState(props.currentScore);
    
    const increaseVotes = () => setVotes(votes + 1);
    const decreaseVotes = () => setVotes(votes - 1);
    
    useEffect(() => {
        updateScore(props.id, votes);
    }, [props.id, votes])


    return (
        <div className={styles.votesCount}>
            <VoteButton click={increaseVotes} src="/images/icon-plus.svg" alt="plus icon" height={15}/>
            <span>{votes}</span>
            <VoteButton click={decreaseVotes} src="/images/icon-minus.svg" alt="minus icon" height={5}/>
        </div>
    )
}

export default VotesCount;