import React, { useState, useEffect } from "react";

export function Login({ props }) {
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [hasLogged, setHasLogged] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") === null
      ? setHasLogged(false)
      : setHasLogged(true);
  }, []);

  async function loginUser(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5500/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (!response.ok) return console.log(response.status);
    const data = await response.json();
    localStorage.setItem("token", JSON.stringify(data.token));
    setHasLogged(true);
  }

  return (
    <>
      <h2>Login</h2>
      {!hasLogged ? (
        <form onSubmit={(e) => loginUser(e)}>
          <label>Username:</label>
          <br />
          <input
            type="text"
            name="username"
            placeholder="johndoe123"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <label>Password:</label>
          <br />
          <input
            type="password"
            name="psw"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit">Login</button>
        </form>
      ) : (
        "Has logged!"
      )}
    </>
  );
}
