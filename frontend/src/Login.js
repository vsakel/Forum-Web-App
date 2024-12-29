
import React, { useState } from "react";

async function loginUser(credentials) {
    let apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8080';
    return fetch(apiUrl + "/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(credentials)
          }).then(data => data.json())

}

function Login(props) {
    let apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8080';
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        // check for form validity
        // normally we create tokens and stuff.
        try {
            const result = await loginUser({
                "email": emailInput,
                "psw": passwordInput
            });
            console.log(result);
            if ("length" in result && result.length === 0) {
                console.log("Wrong email/password");
            } else if ("length" in result && result.length > 0) {
                console.log("User logged in successfully");
                props.onUserLogin(emailInput);
            } else {
                console.log("Unknown error");
            }
        } catch (err) {
            console.log(err)
        }
    }

    return <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" id="email" required value={emailInput}
                        onChange={(event) => setEmailInput(event.target.value)}/>

                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" id="psw" required value={passwordInput}
                        onChange={(event) => setPasswordInput(event.target.value)}/>
                <button type="submit" className="loginbtn">Login</button>
            </form>
           </div>;
}

export default Login;