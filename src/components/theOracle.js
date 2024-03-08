import React, { useState } from "react";

function TheOracle({ changePlayEvent, updateCharacter }) {
  const OpenAI = require("openai");

  // const openai = new OpenAI({
  //   apiKey: "",
  //   dangerouslyAllowBrowser: true,
  // });

  const [playerInput, setPlayerInput] = useState("");
  const handleInputChange = (event) => {
    setPlayerInput(event.target.value);
  };

  const API_KEY = useState(""); //change to env
  const API_BODY = {
    messages: [
      {
        role: "system",
        content:
          "You are the Oracle. A magical prophet of great importance in this world. \n Base your knownledge off anything from the Dungeons and Dragons setting : Forgotten Realms \n You will answer 3 questions to the player/the user, but will become enraged or impatient if they ask you anything silly or unimportant. \n if you become enrage or the player has asked too many questions answer them : Begone! \n if they continue to ask you question respond only : ...",
      },
      {
        role: "user",
        content: playerInput,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 60,
  };

  async function callAPI() {
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + API_KEY,
      },
      body: JSON.stringify(API_BODY),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.choices);
        setAPIresponse(data.choices[0].message.content);
      });
  }

  const [APIresponse, setAPIresponse] = useState("");

  const [conversation, setConverstation] = useState("");

  const converse = () => {
    setConverstation(conversation + "\n" + playerInput);
    callAPI();
    setConverstation(conversation + "\n" + APIresponse);
  };
  return (
    <div>
      <h1>You arrive at the Oracle.</h1>
      <p>{conversation}</p>
      <input type="text" value={playerInput} onChange={handleInputChange} />
      <button onClick={converse}>Speak</button>
      <button>Take your leave</button>
    </div>
  );
}

export default TheOracle;
