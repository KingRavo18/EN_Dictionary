import { useState, type JSX } from "react";

export default function Dictionary(): JSX.Element{
    const [word, setWord] = useState("");

    function fetchDescribeResults(): void{

    }

    return(
        <main className="w-full flex justify-center pt-[5%]">
            <input 
                type="text" 
                value={word} 
                onChange={event => setWord(event.target.value)} 
                placeholder="Enter word"
                className="py-0.5 px-2.5 text-[130%] border-b-2 border-b-[#bbbbbb]"
            />
            <button onClick={fetchDescribeResults}>Find</button>
        </main>
    );
}