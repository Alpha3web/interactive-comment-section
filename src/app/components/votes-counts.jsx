"use client"

import Image from "next/image";
import styles from "@/app/page.module.css"
import { useEffect, useState } from "react";
import { updateScore } from "../lib/server";
import Button from "./button";

const VotesCount = ({commentId, currentScore}) => {
    const [votes, setVotes] = useState(currentScore);
    const [hasVoted, setHasVoted] = useState({lastVote: ""});

    const updateLocalScore = (voteType, increment) => {
        const votedComments = JSON.parse(localStorage.getItem("votes"));

        if (!votedComments || votedComments[commentId] === undefined) {
            setVotes(votes + increment);
            console.log("forward vote")
        } else if (votedComments[commentId] !== voteType) {
            setVotes(votes + (2 * increment)); 
        }

        const data = JSON.stringify({...votedComments, [commentId]: voteType});
        localStorage.setItem("votes", data);            
        setHasVoted({lastVote: voteType});

    }

    useEffect(() => {
        updateScore(commentId, votes);
    }, [commentId, votes])
       
    return (
        <div className={styles.votesCount}>
            <Button
                disable={hasVoted.lastVote === "upVote"}
                onClick={() => updateLocalScore("upVote", 1)}
                text={<Image
                    className={styles.voteBtn}
                    alt="plus icon"
                    src="/images/icon-plus.svg"
                    width={15}
                    height={15}
                />}
            />
            <span>{votes}</span>
            <Button
                disable={hasVoted.lastVote === "downVote"}
                onClick={() => updateLocalScore("downVote", -1)}
                text={<Image
                    className={styles.voteBtn}
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