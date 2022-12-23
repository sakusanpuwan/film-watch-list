import { useState } from "react";
import { auth } from "../firebase-config";

const Account = ({register , user , logout , login}) => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    

    return(
        <div className="account=container">
            <div className="register-container">
                <h3>Register New User</h3>
                <input placeholder="Email..." onChange={(event) => {setRegisterEmail(event.target.value)}}/>
                <input placeholder="Password..." onChange={(event) => {setRegisterPassword(event.target.value)}}/>
                <button onClick={register(registerEmail,registerPassword)}>Create User</button>
            </div>
            <div className="sign-in-container">
                <h3>Sign In</h3>
                <input placeholder="Email..." onChange={(event) => {setLoginEmail(event.target.value)}}/>
                <input placeholder="Password..." onChange={(event) => {setLoginPassword(event.target.value)}}/>
                <button onClick={login(loginEmail,loginPassword)}>Sign In</button>
            </div>
            <div className="sign-out-container">
                <h3>User Signed In: {user ? user.email:null} </h3>
                <button onClick={logout}>Sign Out</button>
            </div>
        </div>
    )
}

export default Account