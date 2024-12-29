
import React from "react";
import './Posts.css';

function PM(props) {
    return (
        <div className="marg">
            <div className="header">
                <div className="user_role">
                    <div className="username">{props.pm.username}</div>
                    <div className="rolename">{props.pm.role_name}</div>
                </div>
                <div className="subject">{props.pm.subject}</div>
                <div className="date">{props.pm.date}</div>
            </div>
            <div className="content">{props.pm.content}</div>
        </div>
    )
}

export default PM;