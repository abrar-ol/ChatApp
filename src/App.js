import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/card/Card";

import "./app.css";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");

  return (
    <div className="container">
      {true ? (
        <>
          <Navbar />
          <Card />
          <span className="username">
            {user}
          </span>
        </>
      ) : (
        <div className="login">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <button onClick={() => setUser(username)}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
