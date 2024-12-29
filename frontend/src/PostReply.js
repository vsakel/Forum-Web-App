
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostReply(props) {
    let apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8080';
    const [postContent, setPostContent] = useState("");
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // check for form validity
        // normally we create tokens and stuff.
        try {
            const result = await props.onPostReply({
                "content": postContent
            });
            console.log(result);
            if ("affectedRows" in result && result.affectedRows === 1) {
                console.log("Post posted successfully");
                props.reloadThread();
                setPostContent("");
            } else {
                console.log("Unknown error");
            }
        } catch (err) {
            console.log(err)
        }
    }

    return <div>
            <h3>Post Reply</h3>
            <form onSubmit={handleSubmit}>
                <textarea name="post_content" required value={postContent} onChange={(event) => setPostContent(event.target.value)}/>

                <button type="submit" className="postbtn">Post</button>
            </form>
           </div>;
}

export default PostReply;