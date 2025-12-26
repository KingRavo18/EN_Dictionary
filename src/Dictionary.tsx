import { useState, type JSX } from "react";

type WordData = {
    word?: string,
    definition?: string,

}

export default function Dictionary(): JSX.Element{
    const [searchedWord, setSearchedWord] = useState<string>("");
    const [wordData, setWordData] = useState<WordData | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    async function fetchDescribeResults(): Promise<void>{
        if(searchedWord.trim() === "" || wordData?.word === searchedWord){
            return;
        }
        console.log();
        try{
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`);
            if(!response.ok){
                throw new Error("This word does not exist");
            }
            const data = await response.json();
            const [{ 
                word,
                meanings: [{ definitions: [{ definition }]}] 
            }] = data;
            setWordData({
                word: word.charAt(0).toUpperCase() + word.slice(1),
                definition: definition,
            });
        }
        catch(error){
            setWordData(undefined);
            setErrorMessage((error as Error).message);
        }
    }

    return(
        <main className="w-full flex flex-col items-center pt-[2.5%]">
            <h1 className="font-bold text-[200%]">DICTONARY</h1>
            <div className="flex items-center mt-[2.5%]">
                <input 
                    type="text" 
                    value={searchedWord} 
                    onChange={event => setSearchedWord(event.target.value)} 
                    placeholder="Search..."
                    autoComplete="off"
                    className="py-0.5 px-2.5 text-[130%] border-b-2 cursor-pointer transition-[2s]
                            border-b-[#bbbbbb] hover:border-b-[#7c7c7c] hover:bg-[#f1f1f1]"
                />
                <button 
                    onClick={fetchDescribeResults}
                    className="py-0.5 px-2.5 text-[130%] 
                            cursor-pointer material-symbols-outlined transition-[2s]
                            text-[#949494] hover:text-[#666666]"
                >
                    search
                </button>
            </div>
            {wordData && 
                (
                    <div className="mt-[2.5%] text-center">
                        <h2 className="font-bold text-[150%] 
                                     bg-[#f2ffb7] rounded-[5px] border-2 border-[#bcbd99]"
                        >
                            {wordData.word}
                        </h2>
                        <p className="mt-[2.5%] w-75 bg-[#f2ffb7] rounded-[5px] border-2 border-[#bcbd99]">
                            {wordData.definition}
                        </p>
                    </div>
                )
                ||
                (
                    <p className="w-75 mt-[2.5%] text-center 
                                bg-[#fce0db] rounded-[5px] border-2 border-[#fc8772]"
                    >
                        {errorMessage}
                    </p>
                )
            }
        </main>
    );
}