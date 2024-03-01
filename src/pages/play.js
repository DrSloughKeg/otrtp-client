import react, { useState, useEffect } from "react";
import axios from "axios";

function Play() {
  const accessToken = localStorage.getItem("accessToken");
  const playToken = localStorage.getItem("playToken");
  const [playEvent, setPlayEvent] = useState(0);
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

  const [subEvent, setSubEvent] = useState("");
  const [d20, setD20] = useState(20);

  useEffect(() => {
    if (subEvent === "investigate") {
      setD20(roll());
    }
  }, [subEvent]);

  const roll = () => {
    return Math.floor(Math.random() * 20) + 1;
  };

  const statCheck = (stat, diffClass, roll) => {
    return stat + roll >= diffClass;
  };

  return (
    <div>
      {playEvent === 0 && (
        <div>
          {subEvent === "" && (
            <div>
              <p>
                As you walk along the road to Phandelver, you come across a
                broken wagon sitting in the middle of the trail. What would you
                like to do?
              </p>
              <button onClick={() => setSubEvent("investigate")}>
                Investigate
              </button>
              <button onClick={() => setSubEvent("passItBy")}>
                Pass it by
              </button>
            </div>
          )}
          {subEvent === "investigate" && (
            <div>
              <p>
                Investigatation check: you roll a {d20} + {(char.intl - 10) / 2}
                .
              </p>
              {statCheck((char.intl - 10) / 2, 8, d20) ? (
                <div>
                  <p>
                    You investigate the wagon closer. You notice clear signs of
                    an attack. This wagon wasnt just left here. It was attacked.
                    Judging by the small foot prints around it's likely to have
                    been a group of goblins.
                  </p>
                  <button onClick={() => setSubEvent("trackTheGoblins")}>
                    Track down the goblins.
                  </button>
                  <button onClick={() => setSubEvent("passItBy")}>
                    Best to continue onwards.
                  </button>
                </div>
              ) : (
                <div>
                  <p>
                    You investigate the wagon closer. One of it's wheels has a
                    few broken spokes. Someone must have abandoned it.
                  </p>
                  <button onClick={() => setSubEvent("passItBy")}>
                    Nothing useful here.
                  </button>
                </div>
              )}
            </div>
          )}
          {subEvent === "passItBy" && (
            <div>
              <p>
                You pay no heed to the wagon on the road, you have many miles to
                go, and little time to wonder about every piece of junk from
                here to Phandelver.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Play;
