import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function AllStories() {
  const [stories, setStories] = useState([]);
  const navv = useNavigate();
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/story/all/").then((res) => {
      setStories(res.data);
    });
  }, []);
  return (
    <>
      <div className="container">
        <div className="w-100 d-flex justify-content-end gap-2 mb-2">
          <div className="flex-grow-1">
            <h3 className="text-center fw-bold" style={{ fontFamily: "Montserrat" }}>
              Write Space
            </h3>
          </div>
          <button className="btn btn-success" onClick={() => navv("/creator")}>
            Your Content
          </button>
          <button className="btn btn-success" onClick={() => navv("/create")}>
            Create
          </button>
          <button className="btn btn-primary" onClick={() => navv("/login")}>
            Login
          </button>
          <button className="btn btn-primary" onClick={() => navv("/signup")}>
            SignUp
          </button>
        </div>
        <div className="d-flex flex-column gap-2">
          {stories.map((i, j) => (
            <div key={j} className="w-100 border p-3 text-start  story-div bg-white rounded-2 overflow-hidden" onClick={() => navv(`/view/${i.id}`)}>
              <h3>{i.title} </h3>
              <i>by {i.author}</i>
              <p style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis", }} >
                {i.story}
              </p>{" "}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllStories;
