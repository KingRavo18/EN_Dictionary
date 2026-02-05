type DictionaryErrorProps = {
    errorMessage: string;
}

export default function DictionaryError({ errorMessage }: DictionaryErrorProps){
    return(
        <p className="w-75 mt-[2.5%] text-center bg-[#fce0db] rounded-[5px] border-2 border-[#fc8772]
            [animation-name:risingAnimation] [animation-duration:500ms]"
        >
            {errorMessage}
        </p>
    )
}