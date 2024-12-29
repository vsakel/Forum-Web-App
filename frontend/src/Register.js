
import React, { useState } from "react";

async function registerUser(credentials) {
    let apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8080';
    return fetch(apiUrl + "/register", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(credentials)
          }).then(data => data.json())

}

function Register(props) {
    let apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8080';
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordRepeatInput, setPasswordRepeatInput] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        // check for form validity
        // normally we create tokens and stuff.
        try {
            const result = await registerUser({
                "username": nameInput,
                "email": emailInput,
                "psw": passwordInput
            });
            console.log(result);
            if ("code" in result && result.code === 'ER_DUP_ENTRY') {
                console.log("Email/password already exists");
            } else if ("affectedRows" in result && result.affectedRows === 1) {
                console.log("User registered successfully");
                props.onUserRegister(emailInput);
            } else {
                console.log("Unknown error");
            }
        } catch (err) {
            console.log(err)
        }
    }

    return <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username"><b>Username</b></label>
                <input type="text" placeholder="Enter username" name="username" id="username" required value={nameInput} 
                        onChange={(event) => setNameInput(event.target.value)}/>

                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" id="email" required value={emailInput}
                        onChange={(event) => setEmailInput(event.target.value)}/>

                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" id="psw" required value={passwordInput}
                        onChange={(event) => setPasswordInput(event.target.value)}/>

                <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required value={passwordRepeatInput}
                        onChange={(event) => setPasswordRepeatInput(event.target.value)}/>
                <button type="submit" className="registerbtn">Register</button>
            </form>
           </div>;
}

export default Register;