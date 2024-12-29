
import React from "react";

import Post from "./Post"

function PostContainer(props) {
    const posts = props.posts.map((post) => {
        return <Post key={post.post_id.toString()} post={post}/>
    });
    return (
        <div>{posts}</div>
    )
}

export default PostContainer;