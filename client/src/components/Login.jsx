import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        email: "", password: ""
    })

    function handleLogin(e) {
        e.preventDefault()
        axios.post("http://localhost:2000/api/login", loginData )
            .then(res => {
                console.log(res)
                alert(res.data.message)
                //store the token in frontend
                localStorage.setItem("token", res.data.token)
            })
            .catch((err) => {
                console.log(err)
                alert(err.response.data.message)
            })
    }

    function handleChange(e) {
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <form onSubmit={handleLogin}>
            <div className='form-field'>
                <input
                    type="email"
                    name="email"
                    placeholder='Enter email'
                    value={loginData.email}
                    onChange={handleChange}
                />
            </div>
            <div className='form-field'>
                <input
                    type="password"
                    name="password"
                    placeholder='Enter password'
                    value={loginData.password}
                    onChange={handleChange}
                />
            </div>
            <button>Login</button>
        </form>
    )
}
