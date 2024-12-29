import React from "react";
import './Shout.css';

function Shout(props){
    return(
        <div className="marg2">
            <div className="header2">
                <div className="usernameShout">{props.shout.username}</div>
                <div className="dateShout">{props.shout.date}</div>
            </div> 
            <div className="contentShout">{props.shout.content}</div>   
        </div>
    )    
}

export default Shout;