type DictionaryErrorProps = {
    errorMessage: string;
}

export default function DictionaryError({ errorMessage }: DictionaryErrorProps){
    return(
        <p className="w-75 mt-[2.5%] text-center bg-(--error-message-background-color) rounded-[5px] border-2 border-(--error-message-border-color)
            [animation-name:risingAnimation] [animation-duration:500ms]"
        >
            {errorMessage}
        </p>
    )
}