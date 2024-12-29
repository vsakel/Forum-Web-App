
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PMContainer from './PMContainer'
import SendPM from "./SendPM";

function Inbox(props) {
    const [pms, setPMs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(props);
        if (!props.loggedin) {
            navigate("/")
        }
        let apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8080';
        console.log(apiUrl + "/inbox/" + props.user_email);
        fetch(apiUrl + "/inbox/" + props.user_email, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setPMs(data);
            //console.log(pms);
        })
        .catch(e => console.log(e));
    }, [props]);

    const handleSendPM = async (pm) => {
        pm.author_email = props.user_email;
        console.log(pm);

        let apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8080';
        return fetch(apiUrl + "/pm", {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(pm)
                }).then(data => data.json())
    }

    return <div>
            <h1>Inbox</h1>
            <PMContainer pms={pms}/>
            <SendPM onSendPM={handleSendPM}/>
           </div>;
}

export default Inbox;