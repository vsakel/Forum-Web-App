
import React from "react";

import PM from "./PM"

function PMContainer(props) {
    const pms = props.pms.map((pm) => {
        return <PM key={pm.pm_id.toString()} pm={pm}/>
    });
    return (
        <ul>{pms}</ul>
    )
}

export default PMContainer;