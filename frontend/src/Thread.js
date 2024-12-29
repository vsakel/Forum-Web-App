
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PostContainer from './PostContainer'
import PostReply from './PostReply'

function Thread(props) {
    let params = useParams();
    const [posts, setPosts] = useState([]);

    async function loadThread() {
        let apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8080';
        console.log(apiUrl + "/thread/" + params.threadid);
        fetch(apiUrl + "/thread/" + params.threadid, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setPosts(data);
            //console.log(posts);
        })
        .catch(e => console.log(e));
    }

    useEffect(() => {
        loadThread();
    }, [params.threadid]);

    const handlePostReply = async (post) => {
        post.thread_id = params.threadid;
        post.email = props.user_email;
        console.log(post);

        let apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8080';
        return fetch(apiUrl + "/post", {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(post)
                }).then(data => data.json())
    }

    const reloadThread = async () => {
        loadThread();
    }
    
    if (props.loggedin) {
        return <div>
                <h1>Thread page</h1>
                <PostContainer posts={posts}/>
                <PostReply onPostReply={handlePostReply} reloadThread={reloadThread}/>
               </div>;
    } else {
        return <div>
                <h1>Thread page</h1>
                <PostContainer posts={posts}/>
               </div>;
    }
}

export default Thread;