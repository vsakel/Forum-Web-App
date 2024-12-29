
import React, { useState } from "react";
import './Posts.css';

function Post(props) {
    return (
        <div className="marg">
            <div className="header">
                <div className="user_role">
                    <div className="username">{props.post.username}</div>
                    <div className="rolename">{props.post.role_name}</div>
                </div>
                <div className="date">{props.post.date}</div>
            </div>
            
            <div className="content">{props.post.content}</div>
        </div>
    )
}

export default Post;