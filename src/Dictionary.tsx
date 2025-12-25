import { useState, type JSX } from "react";

type WordData = {
    word: string
}

export default function Dictionary(): JSX.Element{
    const [searchedWord, setSearchedWord] = useState<string>("");
    const [wordData, setWordData] = useState<WordData | undefined>(undefined);

    async function fetchDescribeResults(): Promise<void>{
        if(searchedWord.trim() === ""){
            return;
        }
        try{
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`);
            if(!response.ok){
                throw new Error("This word does not exist");
            }
            const data = await response.json();
            const [{ word }] = data;
            setWordData({
                word: word,

            });
        }
        catch(error){
            console.error(error);
        }
    }

    return(
        <main className="w-full flex flex-col items-center pt-[5%]">
            <div className="flex items-center">
                <input 
                    type="text" 
                    value={searchedWord} 
                    onChange={event => setSearchedWord(event.target.value)} 
                    placeholder="Search..."
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
                <div>{wordData.word}</div>
            }
        </main>
    );
}