interface UserProps {
    key: string,
    user: {}
}

const User = (props: UserProps) => {
    return (
        <div>{props.key}</div>
    )
}

export default User