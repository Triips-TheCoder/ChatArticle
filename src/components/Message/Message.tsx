import './Message.css'
import {DocumentData} from "firebase/firestore"
import Moment from "react-moment"
import {useEffect, useRef} from "react";

interface MessageProps {
    key: number,
    message: DocumentData
    loggedInUserId: string
}


const Message = (props: MessageProps) => {
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const {key, message, loggedInUserId} = props

    // Permet de scroller automatiquement tout en bas de la conversation lorsuqu'un message est envoyé
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [message])

    return (
        <div className={`message-wrapper ${message.from === loggedInUserId ? 'own' : ""}`} ref={scrollRef}>
            <p className={message.from === loggedInUserId ? "me" : "friend"}>
                {message.media ? <img src={message.media} alt={message.text}/> : null}
                {message.text}
                <br/>
                <small>
                    <Moment fromNow>{message.createdAt.toDate()}</Moment>
                </small>
            </p>
        </div>
    )
}

export default Message