import './Message.css'
import {DocumentData} from "firebase/firestore"
import Moment from "react-moment"

interface MessageProps {
  key: number,
  message: DocumentData
  loggedInUserId: string
}


const Message = (props: MessageProps) => {
  const {key, message, loggedInUserId} = props

  return (
      <div className={`message-wrapper ${message.from === loggedInUserId ? 'own' : ""}`}>
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