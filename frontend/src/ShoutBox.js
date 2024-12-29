
import React, { useState, useEffect } from "react";
import PostShout from "./PostShout";

import ShoutContainer from './ShoutContainer'


function Shoutbox(props) {
    const [shouts, setShouts] = useState([]);

    async function loadShoutbox() {
        let apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8080';
        console.log(apiUrl + "/shoutbox");
        return fetch(apiUrl + "/shoutbox", {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setShouts(data);
        })
        .catch(e => console.log(e));
}
    useEffect(() => {
        loadShoutbox();
    }, []);

    const handleShoutPost = async (shout) => {
        shout.email = props.user_email;
        console.log(shout);

        let apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8080';
        return fetch(apiUrl + "/shout", {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(shout)
                }).then(data => data.json())
    }

    const reloadShoutbox = async () => {
        loadShoutbox();
    }

    if (props.loggedin) {
        return <div className="shoutbox">
                <h1>Shoutbox</h1>
                <ShoutContainer shouts={shouts}/>
                <PostShout onPostShout={handleShoutPost} reloadShoutbox={reloadShoutbox}/>
            </div>;
    } else {
        return <div className="shoutbox">
                <h1>Shoutbox</h1>
                <ShoutContainer shouts={shouts}/>
            </div>;
    }
}

export default Shoutbox;