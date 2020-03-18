import React, {useState}from 'react';
import './style.css'
import axios from 'axios'

const Login = () =>{

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submit= (event) =>{
        event.preventDefault();
        axios.post('/api/user/login', {
            "email": email,
            "password": password
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return(
        <div className="container">
            <form>
                <div className="row LoginEmail">
                    <div className="offset-2 col-2 ">Email:</div>
                    <div className="col-5"><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" ></input></div>
                </div>
                <div className="row LoginPassword">
                    <div className="offset-2 col-2">password:</div>
                    <div className="col-5"><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password"></input></div>
                </div>
                <button className="offset-4" onClick = {submit} disabled={password=="" || email==""}>Login</button>
            </form>
        </div>
    )
}

export default Login;