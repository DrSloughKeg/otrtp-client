import react, { useState, useEffect } from "react";
import axios from "axios";
import FirstEvent from "../components/FirstEvent";
import SecEvent from "../components/SecEvent";

function Play() {
  const accessToken = localStorage.getItem("accessToken");

  //saved player progress in local storage
  //like a checkpoint based autosave
  const playToken = localStorage.getItem("playToken");
  const [playEvent, setPlayEvent] = useState(-1);

  //get character info
  const [char, setChar] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/character/getEvent", {
        headers: { accessToken, playToken },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setChar(response.data);
          setPlayEvent(char.evnt);
        }
      });
  }, [playEvent]);
  //sub events for choices
  const [subEvent, setSubEvent] = useState("");

  //dice rolls and skill checks
  const [d20, setD20] = useState(20);
  useEffect(() => {
    setD20(roll());
  }, [subEvent]);
  const roll = () => {
    return Math.floor(Math.random() * 20) + 1;
  };
  const statCheck = (stat, diffClass, roll) => {
    return stat + roll >= diffClass;
  };

  const updateCharacter = async (characterData) => {
    try {
      await axios.put("http://localhost:3001/character/update", characterData, {
        headers: { accessToken },
      });
      console.log("Character updated");
    } catch (error) {
      console.error("Error updating character:", error);
      alert("Error updating character");
    }
  };

  const changePlayEvent = (event) => {
    setPlayEvent(event);
  };

  //console log to check char state
  useEffect(() => {
    console.log(char);
  }, [char]);

  return (
    <div>
      {playEvent === 0 && (
        <FirstEvent
          subEvent={subEvent}
          setSubEvent={setSubEvent}
          d20={d20}
          char={char}
          statCheck={statCheck}
          setChar={setChar}
          changePlayEvent={changePlayEvent}
          updateCharacter={updateCharacter}
        />
      )}
      {playEvent === 1 && (
        <SecEvent
          d20={d20}
          char={char}
          statCheck={statCheck}
          setChar={setChar}
          changePlayEvent={changePlayEvent}
          updateCharacter={updateCharacter}
        />
      )}
    </div>
  );
}

export default Play;
