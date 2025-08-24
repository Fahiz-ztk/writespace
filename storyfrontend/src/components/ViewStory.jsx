import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function ViewStory() {
    const [title,setTitle]=useState("")
    const [story,setStory]=useState("")
    const {id} = useParams()

  const navv =useNavigate()
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/story/all/${id}`).then((res) => {
      setStory(res.data.story);
      setTitle(res.data.title);
    });
  }, []);

  return (
    <>
      <div className="container">
        
      <button className="btn btn-secondary mb-2 " onClick={(e) => navv('/')}>
              Back
            </button>
           <div className="border p-2  bg-white">
                <h3 className="text-center">{title}</h3>
                <p>{story}</p>
           </div>
      </div>
    </>
  );
}

export default ViewStory;
