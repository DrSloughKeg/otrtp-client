import React, { useState, useEffect } from "react";
import axios from "axios";
import FirstEvent from "../components/FirstEvent";
import SecEvent from "../components/SecEvent";
import ThirdEvent from "../components/Thirdevent";
import TheOracle from "../components/theOracle";

function Play() {
  const accessToken = localStorage.getItem("accessToken");
  //store character being played
  const playToken = localStorage.getItem("playToken");
  //store current event
  const [playEvent, setPlayEvent] = useState(-1);

  //get character info
  const [char, setChar] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SITE_URL}/character/getEvent`, {
        headers: { accessToken, playToken },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setChar(response.data);
          setPlayEvent(response.data.evnt);
        }
      });
  }, []);

  //Save Character info
  const updateCharacter = async (characterData) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_SITE_URL}/character/update`,
        characterData,
        {
          headers: { accessToken },
        }
      );
      console.log("Character updated");
    } catch (error) {
      console.error("Error updating character:", error);
      alert("Error updating character");
    }
  };

  //change Play event and update character (autosave)
  const changePlayEvent = (event, char) => {
    setPlayEvent(event);
    updateCharacter(char);
    setSubEvent("");
  };

  //sub events for choices
  const [subEvent, setSubEvent] = useState("");

  //dice rolls and skill checks
  //roll 1-20
  const roll = () => {
    return Math.floor(Math.random() * 20) + 1;
  };
  //set d20 to roll
  const [d20, setD20] = useState(20);
  useEffect(() => {
    setD20(roll());
  }, [subEvent]);
  //check roll + stat verus Difficulty Class
  const statCheck = (stat, diffClass, roll) => {
    return stat + roll >= diffClass;
  };

  //console log to check char state
  // useEffect(() => {
  //   console.log(char);
  // }, [char]);

  return (
    <div>
      {playEvent === 0 && (
        <FirstEvent
          subEvent={subEvent}
          setSubEvent={setSubEvent}
          d20={d20}
          char={char}
          statCheck={statCheck}
          changePlayEvent={changePlayEvent}
        />
      )}
      {playEvent === 1 && (
        <SecEvent
          d20={d20}
          char={char}
          statCheck={statCheck}
          setChar={setChar}
          changePlayEvent={changePlayEvent}
        />
      )}
      {playEvent === 2 && (
        <ThirdEvent
          subEvent={subEvent}
          setSubEvent={setSubEvent}
          d20={d20}
          char={char}
          statCheck={statCheck}
          changePlayEvent={changePlayEvent}
        />
      )}
      {playEvent === 7 && (
        <TheOracle changePlayEvent={changePlayEvent} char={char} />
      )}
    </div>
  );
}

export default Play;
