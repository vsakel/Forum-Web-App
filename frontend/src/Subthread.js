
import { Link } from "react-router-dom"
import React from "react";

function Subthread(props) {
    return (
    <div className="subthread">
        <Link to={ "/thread/"+ props.thread.thread_id +""  } >{props.thread.title}</Link>
    </div>
    )
}

export default Subthread;