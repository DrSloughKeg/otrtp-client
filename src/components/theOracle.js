import axios from "axios";
import React, { useState } from "react";

function TheOracle({ changePlayEvent, char }) {
  const [playerInput, setPlayerInput] = useState("");
  const handleInputChange = (event) => {
    setPlayerInput(event.target.value);
  };

  const [conversation, setConverstation] = useState(
    "As you stand before The Oracle, a sense of anticipation and reverence washes over you. " +
      "You are granted the opportunity to ask one question, a chance to unravel the mysteries of the universe. " +
      "What knowledge will be of utmost worth to you in this moment of profound opportunity? " +
      "Choose wisely, for the answer may shape the course of your destiny."
  );

  const callAPI = () => {
    axios
      .get(`${process.env.REACT_APP_SITE_URL}/OpenAi/callAPI`, {
        params: { playerInput: playerInput },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data);
          const updatedConversation = `${conversation}\n\n\n${playerInput}\n\n${response.data}`;
          setConverstation(updatedConversation);
        }
      })
      .catch((error) => {
        console.error("Error calling API", error);
      });
  };

  const converse = () => {
    callAPI();
  };

  return (
    <div>
      <img src="oracle.png" alt="The great oracle" />
      <p className="Oracle">{conversation}</p>
      <div className="dialogBar">
        <input type="text" value={playerInput} onChange={handleInputChange} />
        <button onClick={converse}>Speak</button>
        <button
          onClick={() => {
            const updatedChar = { ...char, evnt: 10 };
            changePlayEvent(10, updatedChar);
          }}
        >
          Take your leave
        </button>
      </div>
    </div>
  );
}

export default TheOracle;
