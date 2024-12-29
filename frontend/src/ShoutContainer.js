
import React from "react";

import Shout from "./Shout"

function ShoutContainer(props) {
    const posts = props.shouts.map((shout) => {
        return <Shout key={shout.shout_id.toString()} shout={shout}/>
    });
    return (
        <div>{posts}</div>
    )
}

export default ShoutContainer;