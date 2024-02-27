import React, { useEffect, useState } from "react";
import axios from "axios";

function Menu() {
  const accessToken = localStorage.getItem("accessToken");
  const [allUserChars, setAllUserChars] = useState([]);
  //get a list of all character with this user id
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
  }, []);

  //create Character
  const [str, setStr] = useState(10);
  const [dex, setDex] = useState(10);
  const [con, setCon] = useState(10);
  const [intl, setIntl] = useState(10);
  const [wis, setWis] = useState(10);
  const [cha, setCha] = useState(10);
  const createChar = () => {};

  const [toggleCharCreate, setToggleCharCreate] = useState(false);

  return (
    <div>
      {toggleCharCreate ? (
        <div>
          <div className="stats">
            <div>
              <h3>Strength</h3>
              <button onClick={() => setStr(str + 1)}>+</button>
              <h3>{str}</h3>
              <button onClick={() => setStr(str - 1)}>-</button>
            </div>
            <div>
              <h3>Dexterity</h3>
              <button onClick={() => setDex(dex + 1)}>+</button>
              <h3>{dex}</h3>
              <button onClick={() => setStr(dex - 1)}>-</button>
            </div>
            <div>
              <h3>Constution</h3>
              <button onClick={() => setCon(con + 1)}>+</button>
              <h3>{con}</h3>
              <button onClick={() => setStr(con - 1)}>-</button>
            </div>
            <div>
              <h3>Intelligence</h3>
              <button onClick={() => setIntl(intl + 1)}>+</button>
              <h3>{intl}</h3>
              <button onClick={() => setIntl(intl - 1)}>-</button>
            </div>
            <div>
              <h3>Wisdom</h3>
              <button onClick={() => setWis(wis + 1)}>+</button>
              <h3>{wis}</h3>
              <button onClick={() => setWis(wis - 1)}>-</button>
            </div>
            <div>
              <h3>Charsima</h3>
              <button onClick={() => setCha(cha + 1)}>+</button>
              <h3>{cha}</h3>
              <button onClick={() => setCha(cha - 1)}>-</button>
            </div>
          </div>
          <button onClick={createChar}>Create</button>
        </div>
      ) : (
        <div>
          {allUserChars &&
            allUserChars.map((value, key) => {
              return (
                <div key={key}>
                  <h3>{value.charName}</h3>
                  <h3>{value.lvl}</h3>
                  <h3>{value.class}</h3>
                  <h3>{value.hp}</h3>
                  <h3>{value.ap}</h3>
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
