
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostShout(props) {
    let apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8080';
    const [shoutContent, setShoutContent] = useState("");
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // check for form validity
        // normally we create tokens and stuff.
        try {
            const result = await props.onPostShout({
                "content": shoutContent
            });
            console.log(result);
            if ("affectedRows" in result && result.affectedRows === 1) {
                console.log("Shout posted successfully");
                props.reloadShoutbox();
                setShoutContent("");
            } else {
                console.log("Unknown error");
            }
        } catch (err) {
            console.log(err)
        }
    }

    return <div>
            <h3>Shout!</h3>
            <form onSubmit={handleSubmit}>
                <textarea name="shout_content" required value={shoutContent} onChange={(event) => setShoutContent(event.target.value)}/>

                <button type="submit" className="shoutbtn">Shout</button>
            </form>
           </div>;
}

export default PostShout;