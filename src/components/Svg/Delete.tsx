interface DeleteProps{
    del: () => Promise<void>
}

const Delete = (props: DeleteProps) => {
    return (
        <svg
            onClick={() => props.del()}
            style={{
                width: "25px",
                height: "25px",
                cursor: "pointer",
                color: "#f23957"
            }}
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
    )
}

export default Delete