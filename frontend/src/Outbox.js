
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PMContainer from './PMContainer'

function Outbox(props) {
    const navigate = useNavigate();
    const [pms, setPMs] = useState([]);

    useEffect(() => {
        console.log(props);
        if (!props.loggedin) {
            navigate("/")
        }
        let apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8080';
        console.log(apiUrl + "/outbox/" + props.user_email);
        fetch(apiUrl + "/outbox/" + props.user_email, {
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

    return <div>
            <h1>Outbox</h1>
            <PMContainer pms={pms}/>
           </div>;
}

export default Outbox;