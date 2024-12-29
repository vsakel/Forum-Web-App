
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SendPM(props) {
    let apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8080';
    const [subject, setSubject] = useState("");
    const [recepientInput, setRecepientInput] = useState("");
    const [pmContent, setPMContent] = useState("");
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // check for form validity
        // normally we create tokens and stuff.
        try {
            const result = await props.onSendPM({
                "subject": subject,
                "recepient_email": recepientInput,
                "content": pmContent
            });
            console.log(result);
            if ("affectedRows" in result && result.affectedRows === 1) {
                console.log("PM sent successfully");
                navigate("/inbox");
            } else {
                console.log("Unknown error");
            }
        } catch (err) {
            console.log(err)
        }
    }

    return <div>
            <h3>Send PM</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="recepient"><b>To:</b></label>
                <input type="text" placeholder="Enter recepient" name="recepient" id="recepient" required value={recepientInput}
                        onChange={(event) => setRecepientInput(event.target.value)}/>

                <label htmlFor="subject"><b>Subject</b></label>
                <input type="text" placeholder="Enter subject" name="seubject" id="subject" required value={subject}
                        onChange={(event) => setSubject(event.target.value)}/>

                <textarea name="pm_content" required value={pmContent} onChange={(event) => setPMContent(event.target.value)}/>

                <button type="submit" className="sendbtn">send</button>
            </form>
           </div>;
}

export default SendPM;