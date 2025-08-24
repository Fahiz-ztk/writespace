import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function CreateStory() {
  const navv = useNavigate();
  const [formData, setFormData] = useState({});
  const [token, setToken] = useState();
  useEffect(() => {
    if (sessionStorage.getItem("token")) setToken(sessionStorage.getItem("token"));
    else navv('/login')
  });
  const postBtn = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/story/editor/", formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        navv("/");
        toast(`created new post ${formData.title}`)
      }).catch((err)=>{
        toast.error('error creating post')
      })
  };
  return (
    <>
      <div className="container">
        <form className="border rounded-2 p-2 d-flex flex-column gap-2  bg-white">
          <h3>Create Your story</h3>
          <input type="text" placeholder="Title" className="form-control" onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <textarea className="form-control"  placeholder="Write your story" rows={20} onChange={(e) => setFormData({ ...formData, story: e.target.value })}></textarea>
          <div className="d-flex gap-2 m-1">
            <button className="btn btn-success" onClick={(e) => postBtn(e)}>
              post
            </button>
            <button className="btn btn-secondary" onClick={(e) => navv('/')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateStory;
