import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes/${id}`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sebmited, setSubmitet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch(baseUrl);
        if (!responce.ok) {
          throw new Error("Kailed to fetch data.");
        }
        const data = await responce.json();
        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {}
    };
    fetchData();
  }, []);
  const updateNote = async (e) => {
    e.preventDefault();
    try {
      const responce = await fetch(baseUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (responce.ok) {
        setSubmitet(true);
        setTimeout(() => setSubmitet(false));
      } else {
        console.log("Faild to submit data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeNote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseUrl, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className="breadcrump-nav">
        <Link to="/" className="back-button">
          👈 back
        </Link>
        <button onClick={removeNote} className="delete">
          ⚔️ Remove
        </button>
      </div>

      <form onSubmit={updateNote}>
        <div className="single-note">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
              className="title"
            />
          </div>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows="4"
              cols="50"
              className="description"
            ></textarea>
          </div>
        </div>
        <input
          type="Submit"
          value={sebmited ? "Saving note... " : "💾 Save Note"}
          disabled={sebmited}
        />
        <p className="text-center">
          {sebmited && (
            <div className="seccess-message">Note has been added!</div>
          )}
        </p>
      </form>
    </div>
  );
};

export default Update;
