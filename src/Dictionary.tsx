import React, { useState } from "react";
import { SyncLoader } from "react-spinners";

type Definition = {
    definition: string;
}
type Meaning = {
    partOfSpeech: string;
    definitions: Definition[];
}
type WordData = {
    word?: string;
    meanings?: Meaning[];
}

export default function Dictionary(){
    const [searchedWord, setSearchedWord] = useState<string>("");
    const [wordData, setWordData] = useState<WordData | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function fetchDescribeResults(): Promise<void>{
        if(searchedWord.trim() === "" || wordData?.word?.toLowerCase() === searchedWord.trim().toLowerCase()){
            return;
        }
        setWordData(null);
        setErrorMessage(null);
        setIsLoading(true);
        try{
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`);
            if(!response.ok){
                throw new Error("Unfortunately, this word could not be found. Please try another.");
            }
            const [{ word, meanings }] = await response.json();
            setWordData({
                word: word.charAt(0).toUpperCase() + word.slice(1),
                meanings: meanings,
            });
        }
        catch(error){
            setErrorMessage((error as Error).message);
        }
        finally{
            setIsLoading(false);
        }
    }

    function searchUsingEnter(event: React.KeyboardEvent<HTMLInputElement>): void{
        if(event.key === "Enter"){
            fetchDescribeResults();
        }  
    }

    const messages = {
        intro: (
            <p className="w-35 mt-[2.5%] text-center [animation-name:risingAnimation] [animation-duration:500ms]">
                Please input the word you want a description for.
            </p>
        ),
        loading: (
            <SyncLoader 
                size={5} 
                color="black" 
                style={{paddingTop: "3rem"}}
            />
        ),
        error: (
            <p className="w-75 mt-[2.5%] text-center bg-[#fce0db] rounded-[5px] border-2 border-[#fc8772]
                [animation-name:risingAnimation] [animation-duration:500ms]"
            >
                {errorMessage}
            </p>
        )
    }

    return(
        <main className="w-full flex flex-col pb-[5%] items-center mt-[2.5%] [animation-name:fallingAnimation] [animation-duration:500ms]">
            <h1 className="font-bold text-[200%]">DICTIONARY</h1>

            <div className="flex items-center mt-[2.5%]"> 
                <input type="text"
                       value={searchedWord} 
                       onChange={event => setSearchedWord(event.target.value)} 
                       onKeyDown={searchUsingEnter}
                       placeholder="Search..."
                       aria-label="Search the word you need defined"
                       title="Search the word you need defined"
                       autoComplete="off"
                       autoFocus
                       className="py-0.5 px-2.5 text-[125%] border-b-2 cursor-pointer transition-[2s]
                       border-b-[#bbbbbb] hover:border-b-[#7c7c7c] hover:bg-[#f1f1f1] 
                       focus:outline-0 focus:border-b-[#000000] focus:px-4 focus:py-1 focus:text-[130%]"
                />
                <button onClick={fetchDescribeResults}
                        disabled={isLoading}
                        aria-label="Search"
                        title="Search"
                        className="py-0.5 px-2.5 text-[130%] 
                        cursor-pointer material-symbols-outlined transition-[2s]
                        text-[#949494] hover:text-[#666666] active:text-[#303030]"
                >
                    search
                </button>
            </div>

            {!isLoading && !errorMessage && !wordData && messages.intro}
            {isLoading && !wordData && messages.loading}
            {!wordData && errorMessage && messages.error}

            {!errorMessage && wordData && 
                <div className="mt-[2.5%] text-center [animation-name:risingAnimation] [animation-duration:500ms]">
                    <h2 className="font-bold text-[150%] dictionary_window rounded-[5px]">
                        {wordData.word}
                    </h2>
                    {wordData.meanings?.map((meaning_item, index) => 
                        <div key={index}>
                            <p className="mt-[5%] w-75 dictionary_window font-bold rounded-tr-[5px] rounded-tl-[5px]">
                                {meaning_item.partOfSpeech}
                            </p>
                            {meaning_item.definitions?.map((definition_item, index) => 
                                <p key={index} className="w-75 dictionary_window last:rounded-br-[5px] last:rounded-bl-[5px]">
                                    {definition_item.definition}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            }
        </main>
    );
}