import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';


function Login() {
  const [loginData, setLoginData] = useState({});
  const navv = useNavigate();
  const logBtn = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/token/", loginData)
      .then((res) => {
        sessionStorage.setItem("token",res.data.token)
        toast.success(`logged in as ${loginData.username}`)
        navv("/");
      }).catch((err)=>{
        toast.error('invalid credentials')
        console.warn(err.message)}
      )
  };
  return (
    <>
      <div className="container d-flex justify-content-center">
        <form className="w-50 border p-3 d-flex flex-column gap-2  bg-white" action="">
          <h3>Login to continue</h3>
          <input
            type="text"
            className="form-control"
            placeholder="username"
            onChange={(e) => {
              setLoginData({ ...loginData, username: e.target.value });
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="password"
            onChange={(e) => {
              setLoginData({ ...loginData, password: e.target.value });
            }}
          />
          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={(e) => logBtn(e)}>
              Login
            </button>
            <button className="btn btn-secondary" onClick={(e) => navv('/')}>
              Cancel
            </button>
          </div>
                    <span onClick={()=>navv('/signup')} className='cursor-pointer text-primary'>Not a user? Sign up</span>
        </form>
      </div>
    </>
  );
}

export default Login;
