import {useState} from "react";
import "./app.css";

function App() {
  const [username,setUsername]= useState("");
  const [user,setUser]= useState("");
  
  return (
    <div className="container">
      <div className="login">
        <input type="text" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}}></input>
        <button onClick={()=>setUser(username)}>Login</button>
      </div>
    </div>
  );
}

export default App;
