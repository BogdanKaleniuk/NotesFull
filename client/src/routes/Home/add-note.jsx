import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const AddNote = () => {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sebmited, setSubmitet] = useState(false);

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const responce = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (responce.ok) {
        setTitle("");
        setSubmitet(true);
        setTimeout(() => setSubmitet(false));
      } else {
        console.log("Faild to submit data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to="/" className="back-button">
        👈 back
      </Link>
      <form onSubmit={addNote}>
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

export default AddNote;
AddNote;
