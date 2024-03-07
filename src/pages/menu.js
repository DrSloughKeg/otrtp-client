import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Menu() {
  //navigate
  let navi = useNavigate();

  //toggle creation
  const [toggleCharCreate, setToggleCharCreate] = useState(false);
  const [updatecharlist, setUpdateCharList] = useState(0);

  //get a list of all character with this user id
  const accessToken = localStorage.getItem("accessToken");
  const [allUserChars, setAllUserChars] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/character/getByUserId", {
        headers: { accessToken },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setAllUserChars(response.data);
        }
      });
  }, [updatecharlist]);

  //delete character
  const deleteChar = (charId) => {
    axios
      .delete("http://localhost:3001/character/delete", {
        headers: { accessToken },
        data: { charId: charId },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log("char deleted");
          setUpdateCharList(updatecharlist + 1);
        }
      });
  };

  //play
  //create a play token of char id and navigate to play.js
  const playChar = (charId) => {
    axios
      .post(
        "http://localhost:3001/character/play",
        { charId: charId },
        { headers: { accessToken } }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("playToken", response.data);
          navi("/play");
        }
      });
  };

  //create Character
  const [str, setStr] = useState(10);
  const [dex, setDex] = useState(10);
  const [con, setCon] = useState(10);
  const [intl, setIntl] = useState(10);
  const [wis, setWis] = useState(10);
  const [cha, setCha] = useState(10);
  const [points, setPTS] = useState(15);
  const [name, setName] = useState("");

  //increase/decrease stats
  const increaseStat = (stat, setStat) => {
    if (points > 0 && stat < 20) {
      setStat(stat + 1);
      setPTS(points - 1);
    }
  };
  const decreaseStat = (stat, setStat) => {
    if (stat > 3) {
      setStat(stat - 1);
      setPTS(points + 1);
    }
  };

  const [selectedClass, setSelectedClass] = useState("warrior");
  const selectClass = (charClass) => {
    setSelectedClass(charClass);
  };

  const createChar = () => {
    axios
      .post(
        "http://localhost:3001/character/create",
        {
          str: str,
          dex: dex,
          con: con,
          intl: intl,
          wis: wis,
          cha: cha,
          charClass: selectedClass,
          name: name,
        },
        {
          headers: { accessToken },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log("success");
          setToggleCharCreate(false);
          setUpdateCharList(updatecharlist + 1);
        }
      });
  };

  return (
    <div>
      {toggleCharCreate ? (
        <div>
          <div className="creation">
            <div className="stats">
              <h3>Strength</h3>
              <div className="statbox">
                <button onClick={() => increaseStat(str, setStr)}>+</button>
                <p>{str}</p>
                <button onClick={() => decreaseStat(str, setStr)}>-</button>
              </div>
              <h3>Dexterity</h3>
              <div className="statbox">
                <button onClick={() => increaseStat(dex, setDex)}>+</button>
                <p>{dex}</p>
                <button onClick={() => decreaseStat(dex, setDex)}>-</button>
              </div>
              <h3>Constitution</h3>
              <div className="statbox">
                <button onClick={() => increaseStat(con, setCon)}>+</button>
                <p>{con}</p>
                <button onClick={() => decreaseStat(con, setCon)}>-</button>
              </div>
              <h3>Intelligence</h3>
              <div className="statbox">
                <button onClick={() => increaseStat(intl, setIntl)}>+</button>
                <p>{intl}</p>
                <button onClick={() => decreaseStat(intl, setIntl)}>-</button>
              </div>
              <h3>Wisdom</h3>
              <div className="statbox">
                <button onClick={() => increaseStat(wis, setWis)}>+</button>
                <p>{wis}</p>
                <button onClick={() => decreaseStat(wis, setWis)}>-</button>
              </div>
              <h3>Charisma</h3>
              <div className="statbox">
                <button onClick={() => increaseStat(cha, setCha)}>+</button>
                <p>{cha}</p>
                <button onClick={() => decreaseStat(cha, setCha)}>-</button>
              </div>
              <h3>Points Remaining</h3>
              <div className="remain">
                <p>{points}</p>
              </div>
            </div>
            <div className="classes">
              <label>Name: </label>
              <input
                type="text"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <div className="classbox">
                <div
                  className={
                    selectedClass === "warrior" ? "selected-class" : "class"
                  }
                  onClick={() => selectClass("warrior")}
                >
                  <img src="warrior.png" alt="wizard" />
                  <h3>Warrior</h3>
                </div>
                <div
                  className={
                    selectedClass === "rogue" ? "selected-class" : "class"
                  }
                  onClick={() => selectClass("rogue")}
                >
                  <img src="rogue.png" alt="rogue" />
                  <h3>Rogue</h3>
                </div>
                <div
                  className={
                    selectedClass === "wizard" ? "selected-class" : "class"
                  }
                  onClick={() => selectClass("wizard")}
                >
                  <img src="wizard.png" alt="warrior" />
                  <h3>Wizard</h3>
                </div>
              </div>
              <div className="classText">
                {selectedClass === "warrior" && (
                  <p>
                    As a Warrior you will have more hit points and combat
                    focused abilities. You'll be able to use arms and armor
                    other classes cannot. Your specific skills set means you'll
                    excel in combat, but you may struggle in other areas.
                  </p>
                )}
                {selectedClass === "rogue" && (
                  <p>
                    As a Rogue, you excel in agility and stealth, utilizing your
                    cunning and finesse to navigate the shadows. With a moderate
                    amount of health, you possess a versatile skill set for
                    sneaking, picking locks, and ambushing enemies. Your ability
                    to blend into the environment and strike from the shadows
                    makes you a formidable opponent in both combat and stealth
                    encounters.
                  </p>
                )}
                {selectedClass === "wizard" && (
                  <p>
                    Embrace the arcane mysteries as a Wizard, wielding powerful
                    magic spells to shape the world around you. You will have
                    less hit points than other classes but, you can rely on your
                    vast knowledge of magic to overcome challenges and enemies.
                    Through careful study and mastery of the arcane arts, you
                    unleash devastating spells, manipulate elements, and unravel
                    the secrets of the universe. As a Wizard, your intellect and
                    magical prowess are unmatched, making you a force to be
                    reckoned with in any encounter.
                  </p>
                )}
              </div>
            </div>
          </div>
          <button onClick={createChar}>Create</button>
          <button onClick={() => setToggleCharCreate(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          {allUserChars &&
            allUserChars.map((value, key) => {
              return (
                <div key={key} className="charCard">
                  <h3>{value.charName}</h3>
                  <h3>{value.lvl}</h3>
                  <h3>{value.class}</h3>
                  <h3>{value.hp}</h3>
                  <h3>{value.ap}</h3>
                  <button onClick={() => playChar(value.charId)}>Play</button>
                  <button onClick={() => deleteChar(value.charId)}>
                    Delete
                  </button>
                </div>
              );
            })}
          <button
            onClick={() => {
              setToggleCharCreate(true);
            }}
          >
            Create a new character
          </button>
        </div>
      )}
    </div>
  );
}

export default Menu;
