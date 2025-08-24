import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function SignUp() {
    const [authData,setauthData]=useState({})
      const navv = useNavigate();
  const registerBtn = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/signup/", authData)
      .then((res) => {
        toast.success('Sign up successful')
        navv("/");
      }).catch((err)=>{
        toast.error('invalid input')
        console.warn(err.message)}
      )
  };
  return (
    <>
      <div className="container d-flex justify-content-center">
        <form className="w-50 border p-3 d-flex flex-column gap-2  bg-white" action="">
          <h3>SignUp</h3>
          <input
            type="text"
            className="form-control"
            placeholder="username"
            onChange={(e) => {
              setauthData({ ...authData, username: e.target.value });
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="password"
            onChange={(e) => {
              setauthData({ ...authData, password: e.target.value });
            }}
          />
          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={(e) => registerBtn(e)}>
              SignUp
            </button>
            <button className="btn btn-secondary" onClick={(e) => navv('/')}>
              Cancel
            </button>
          </div>
                    <span onClick={()=>navv('/login')} className='cursor-pointer text-primary'>Already A user? Login</span>

        </form>
      </div>
    </>
  )
}

export default SignUp