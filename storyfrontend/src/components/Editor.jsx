import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

function Editor() {
  const navv = useNavigate();
  const [formData, setFormData] = useState({});
  const [token, setToken] = useState();

  const { id } = useParams();
  useEffect(() => {
    if (sessionStorage.getItem("token")) setToken(sessionStorage.getItem("token"));
    else return navv("/login");
    axios
      .get(`http://127.0.0.1:8000/api/story/editor/${id}`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setFormData(res.data);
      });
  }, [formData]);



  const updateBtn = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api/story/editor/${id}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        navv("/creator");
        toast(`updated post ${formData.title}`);
      })
      .catch((err) => {
        toast.error("error Updating post");
      });
  };
  return (
    <>
      <div className="container">
        <form className="border rounded-2 p-2 d-flex flex-column gap-2">
          <h3>Edit</h3>
          <input type="text" placeholder="Title" className="form-control" defaultValue={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <textarea className="form-control" placeholder="Write your story"  defaultValue={formData.story} rows={20} onChange={(e) => setFormData({ ...formData, story: e.target.value })}></textarea>
          <div className="d-flex gap-2 m-1">
            <button className="btn btn-success" onClick={(e) => updateBtn(e)}>
              Update
            </button>
            <button className="btn btn-secondary" onClick={(e) => navv("/creator")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Editor;
