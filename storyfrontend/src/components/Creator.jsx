import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Creator() {
  const navv = useNavigate();
  const [myStories, setMyStories] = useState([]);
  const [refresh, setrefresh] = useState(true);
  useEffect(() => {
    if (!sessionStorage.getItem("token")) return navv("/login");
    axios
      .get("http://127.0.0.1:8000/api/story/editor/",  {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMyStories(res.data);
      });
  }, [refresh]);

    const deleteStory=(id)=>{
    if(confirm('are you sure?')){
            axios
      .delete(`http://127.0.0.1:8000/api/story/editor/${id}/`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      }).then((res)=>{
        setrefresh(!refresh)
      })
    }
  }
  return (
    <>
      <div className="container">
        <div className="w-100 d-flex justify-content-end gap-2 mb-2">
          
            <button className="btn btn-secondary" onClick={(e) => navv('/')}>
              back
            </button>
          <div className="flex-grow-1">
            <h3 className="text-center fw-bold">My Creations</h3>
          </div>
          <button className="btn btn-success" onClick={() => navv("/create")}>
            Create
          </button>
        </div>
        <div className="d-flex flex-column gap-2">
          {myStories.map((i, j) => (
            <div key={j} className="w-100 border  bg-white p-3 text-start text-truncate rounded-2" >
              <h3>{i.title} </h3>
              <i>by you</i>
              <p>{i.story}</p>
              <div className="w-100 d-flex justify-content-end gap-2">
                <button className="btn btn-secondary" onClick={() => navv(`/edit/${i.id}`)}>Edit</button>
                <button className="btn btn-danger" onClick={()=>deleteStory(i.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Creator;
