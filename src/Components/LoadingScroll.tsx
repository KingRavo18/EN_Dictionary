import { SyncLoader } from "react-spinners";

export default function DictionarySpinner(){
    return(
        <SyncLoader 
            size={5} 
            color="var(--text-color)" 
            style={{paddingTop: "3rem"}}
        />
    )
}