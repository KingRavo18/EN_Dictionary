import { useState, type JSX } from "react";

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

export default function Dictionary(): JSX.Element{
    const [searchedWord, setSearchedWord] = useState<string>("");
    const [wordData, setWordData] = useState<WordData | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function fetchDescribeResults(): Promise<void>{
        if(searchedWord.trim() === "" || wordData?.word === searchedWord){
            return;
        }
        try{
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`);
            if(!response.ok){
                throw new Error("This word does not exist");
            }
            const [{ word, meanings }] = await response.json();
            setErrorMessage(null);
            setWordData({
                word: word.charAt(0).toUpperCase() + word.slice(1),
                meanings: meanings,
            });
        }
        catch(error){
            setWordData(null);
            setErrorMessage((error as Error).message);
        }
    }

    return(
        <main className="w-full flex flex-col items-center pt-[2.5%]">
            <h1 className="font-bold text-[200%]">DICTONARY</h1>
            <div className="flex items-center mt-[2.5%]"> 
                <input type="text" 
                       value={searchedWord} 
                       onChange={event => setSearchedWord(event.target.value)} 
                       placeholder="Search..."
                       autoComplete="off"
                       className="py-0.5 px-2.5 text-[130%] border-b-2 cursor-pointer transition-[2s]
                       border-b-[#bbbbbb] hover:border-b-[#7c7c7c] hover:bg-[#f1f1f1]"
                />
                <button onClick={fetchDescribeResults}
                        className="py-0.5 px-2.5 text-[130%] 
                        cursor-pointer material-symbols-outlined transition-[2s]
                        text-[#949494] hover:text-[#666666]"
                >
                    search
                </button>
            </div>
            {!errorMessage && wordData && 
                <div className="mt-[2.5%] text-center">
                    <h2 className="font-bold text-[150%] dictionary_window">
                        {wordData.word}
                    </h2>
                    {wordData.meanings?.map((meaning_item, index) => 
                        <div key={index}>
                            <p className="mt-[5%] w-75 dictionary_window">
                                {meaning_item.partOfSpeech}
                            </p>
                            <p className="w-75 dictionary_window">
                                {meaning_item.definitions[0].definition}
                            </p>
                        </div>
                    )}
                    </div>
            }
            {!wordData && errorMessage && 
                <p className="w-75 mt-[2.5%] text-center bg-[#fce0db] rounded-[5px] border-2 border-[#fc8772]">
                    {errorMessage}
                </p>
            }
        </main>
    );
}