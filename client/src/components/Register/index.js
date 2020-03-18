import React, {useState} from 'react'
import axios from 'axios'

const Register = () =>{

    const [name, setName] = useState("");
    const [password, setPassword] = useState("")
    const[email, setEmail] = useState("")
    const [password2, setPassword2] = useState("")


    const register = (event) =>{
        event.preventDefault();
        axios.post('/api/user/registration', {
            "name": name,
            "password": password,
            "email": email
        }).then((response)=>{
            console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
    }
    return (
        <div classNameName="container">
            <form>
                <div className="row ">
                    <div className="offset-2 col-4">Name:</div>
                    <div className="col-5"><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Name"></input></div>
                </div>
                <div className="row LoginEmail">
                    <div className="offset-2 col-4">Email:</div>
                    <div className="col-5"><input type="email" value={email} onChange= {e=>setEmail(e.target.value)} placeholder="email" ></input></div>
                </div>
                <div className="row LoginPassword">
                    <div className="offset-2 col-4">password:</div>
                    <div className="col-5"><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password"></input></div>
                </div>
                <div className="row LoginPassword">
                    <div className="offset-2 col-4">Reenter-password:</div>
                    <div className="col-5"><input type="password" value={password2} onChange={e=>setPassword2(e.target.value)} placeholder="Reenter password"></input></div>
                </div>
                {password!=password2  &&
                    <div>
                        passwords does not match
                    </div>
                }
                <button className="offset-5" onClick={register} disabled={password=="" || password2=="" || password!=password2 || name=="" || email==""}>Signup</button>
            </form>
        </div>
    )
}


export default Register;