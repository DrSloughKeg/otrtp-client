import axios from "axios";
import React, { useState } from "react";

function TheOracle({ changePlayEvent, char }) {
  const [playerInput, setPlayerInput] = useState("");
  const handleInputChange = (event) => {
    setPlayerInput(event.target.value);
  };
  const [APIresponse, setAPIresponse] = useState("");
  const [conversation, setConverstation] = useState("");

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
          setAPIresponse(response.data);
          if (conversation === "") {
            const updatedConversation = `${playerInput}\n\n${response.data}`;
            setConverstation(updatedConversation);
          } else {
            const updatedConversation = `${conversation}\n\n\n${playerInput}\n\n${response.data}`;
            setConverstation(updatedConversation);
          }
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
      <h1>You arrive at the Oracle.</h1>
      <p className="Oracle">{conversation}</p>
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
  );
}

export default TheOracle;
