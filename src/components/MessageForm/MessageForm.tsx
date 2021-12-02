import "./MessageForm.css"
import Upload from "../svg/Upload"
import React, {Dispatch, SetStateAction} from "react";

interface MessageFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
    text: string
    setText: Dispatch<SetStateAction<string>>
    setImg: Dispatch<SetStateAction<File | null>>
}

type ReactInputEvent = React.ChangeEvent<HTMLInputElement>

const MessageForm = (props: MessageFormProps) => {
    return (
        <form className="message-form" onSubmit={props.handleSubmit}>
            <label htmlFor="img"><Upload/></label>
            <input type="file"
                   id="img"
                   accept="image/*"
                   style={{display: "none"}}
                   onChange={(e:ReactInputEvent) => {
                       const target = e.target as HTMLInputElement
                       props.setImg(target.files![0])
                   }}
            />
            <div>
                <input type="text" placeholder="Entrez un message" value={props.text} onChange={(e: ReactInputEvent) => {
                    const target = e.target as HTMLInputElement
                    props.setText(target.value)
                }}/>
            </div>
            <div>
                <button className="btn">Envoyer</button>
            </div>
        </form>
    )
}

export default MessageForm