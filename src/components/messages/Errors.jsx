import { Alert } from "@mui/material"
import { useContext, useEffect } from "react";
import { MessageContext } from "./../../Contexts";
import "./Errors.css"

export default  function ErrorsComponent (){
    const {errors} = useContext(MessageContext);       
    
    // useEffect(() => console.log("Erro: ",errors), [])

    return Object.values(errors).length > 0 ? (                
            Object.values(errors).map((e) =><Alert severity="error" key={e} className="alert-item">{e}</Alert>)            
        ) : ""
    }