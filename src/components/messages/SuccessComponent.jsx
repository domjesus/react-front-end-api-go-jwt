import { Alert } from "@mui/material"
import { useContext, useEffect } from "react";
import { MessageContext } from "../Contexts";

export default function SuccessComponent (){
    const {success} = useContext(MessageContext);       
    // console.log("Errors: ", errors);

    // useEffect(() => {
    //   console.log("SuccessComponent: ", success);
    // }, []);    

    return (                
            Object.values(success).map((e) =><Alert severity="success" key={e}>{e}</Alert>)        
        )
    }