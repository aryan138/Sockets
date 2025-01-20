import { useEffect, useState } from "react";
import io from "socket.io-client";
import Input from "../components/input";
import "./App.css";

function App() {
  const [score, setScore] = useState({});
  const [playerScores, setPlayerScores] = useState([]);
  const socket = io("http://localhost:3000");

  function connectSocket() {
    socket.on("connection", (response) => {
      console.log(response);
    });
  }

  function handleInput(event) {
    let { name, value } = event.target;
    let currentObj = { [name]: value };

    setScore((prev) => ({ ...prev, ...currentObj }));
  }

  function sendScores() {
    socket.emit("playerScores", score);
    socket.on("playerScores", (data) => {
      setPlayerScores(data);
    });
  }
  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <>
      <h1>Multiplayer Game Dashboard</h1>
      <Input
        name="name"
        placeholder="Enter your name"
        handleInput={handleInput}
      />
      <Input
        name="score"
        placeholder="Enter your score"
        handleInput={handleInput}
      />
      <button className="send-scores" onClick={sendScores}>
        Send Scores
      </button>
      {playerScores.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {playerScores.map((player, index) => (
              <tr key={index}>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
