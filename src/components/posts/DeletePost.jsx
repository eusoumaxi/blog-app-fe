import React, { useState, useEffect } from "react";
import { PostItem } from "./PostItem";

export function DeletePost({ props }) {
  const [post, setPost] = useState(undefined);
  const [id, setId] = useState(0);
  const [isDeleted, setDeleted] = useState(false);

  useEffect(() => {
    setPost(props);
    setId(props.id);
  }, [props]);

  async function deletePost(e) {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:5500/dashboard/posts/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    if (!response.ok) return console.log(response.status);
    setDeleted(true);
  }

  return (
    <>
      {!isDeleted ? (
        <>
          <p>Are you sure you want to delete the post?</p>
          <PostItem post={post}></PostItem>
          <form onSubmit={(e) => deletePost(e)}>
            <button type="submit">Confirm delete</button>
          </form>
        </>
      ) : (
        <p>Post deleted</p>
      )}
    </>
  );
}
