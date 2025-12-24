import { useState, type JSX } from "react";

export default function Dictionary(): JSX.Element{
    const [searchedWord, setSearchedWord] = useState<string>("");

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
            console.log(word);
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <main className="w-full flex justify-center pt-[5%]">
            <input 
                type="text" 
                value={searchedWord} 
                onChange={event => setSearchedWord(event.target.value)} 
                placeholder="Enter word"
                className="py-0.5 px-2.5 text-[130%] border-b-2 cursor-pointer
                         border-b-[#bbbbbb] hover:border-b-[#7c7c7c] hover:bg-[#f1f1f1]"
            />
            <button 
                onClick={fetchDescribeResults}
                className="py-0.5 px-2.5 text-[130%] cursor-pointer"
            >
                Find
            </button>
        </main>
    );
}