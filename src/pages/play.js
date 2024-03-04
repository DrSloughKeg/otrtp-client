import react, { useState, useEffect } from "react";
import axios from "axios";

function Play() {
  const accessToken = localStorage.getItem("accessToken");

  //saved player progress in local storage
  //like a checkpoint based autosave
  const playToken = localStorage.getItem("playToken");
  const [playEvent, setPlayEvent] = useState(0);

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

  // useEffect(() => {
  //   axios
  //     .put(
  //       "http://localhost:3001/character/update",
  //       { data: { char: char } },
  //       { headers: { accessToken, playToken } }
  //     )
  //     .then((response) => {
  //       if (response.data.error) {
  //         alert(response.data.error);
  //       } else {
  //         console.log("Character updated");
  //       }
  //     });
  // }, []);

  //console log to check char state
  useEffect(() => {
    console.log(char);
  }, [char]);

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
          {subEvent === "trackTheGoblins" && (
            <div>
              <p>
                You follow the tracks into the forest besides the trail. It will
                be better to find the goblins before they find you.
              </p>
              <p>
                Survival check: you roll a {d20} + {(char.wis - 10) / 2}.
              </p>
              {statCheck((char.wis - 10) / 2, 12, d20) ? (
                <div>
                  <p>
                    Skillfully you sneak through the woods, while following
                    their tracks. It isnt long until you discover them. Three
                    goblins squabbling and barking at each other like dogs.
                    They're fighting over a few loaves of bread. Might be what
                    they stole from the wagon.
                  </p>
                  <button onClick={() => setSubEvent("sneakAttack")}>
                    Sneak attack
                  </button>
                  <button onClick={() => setSubEvent("goblinsForest")}>
                    Charge them!
                  </button>
                  <button onClick={() => setSubEvent("scareThemOff")}>
                    Try to scare them away
                  </button>
                </div>
              ) : (
                <div>
                  <p>
                    The tracks lead you deep into the forest, you weave through
                    the dense trees and heavy underbrush to follow. As a branch
                    snaps beneath your feet, three green little monsters spring
                    forth from the trees! Maybe following them wasn't the best
                    idea.
                  </p>
                  <button
                    onClick={() => {
                      setChar((prevChar) => ({
                        ...prevChar,
                        hp: prevChar.hp - 4,
                      }));
                      setSubEvent("goblinsForest");
                    }}
                  >
                    To arms!
                  </button>
                </div>
              )}
            </div>
          )}
          {subEvent === "sneakAttack" && (
            <div>
              <p>
                Steath Check: you roll a {d20} + {(char.dex - 10) / 2}.
              </p>
              {statCheck((char.dex - 10) / 2, 13, d20) ? (
                <div>
                  <p>
                    You burst forth from the trees before they can react, and
                    quickly dispatch one of the monsters with your weapon.
                  </p>
                  <button onClick={() => setSubEvent("sneakSucess")}>
                    One down, two to go.
                  </button>
                </div>
              ) : (
                <div>
                  <p>
                    You burst forth from the trees, and the goblins turn to face
                    you.
                  </p>
                  <button onClick={() => setSubEvent("goblinsForest")}>
                    Could have gone better.
                  </button>
                </div>
              )}
            </div>
          )}
          {subEvent === "scareThemOff" && (
            <div>
              <p>
                Intimidaton Check: you roll a {d20} + {(char.cha - 10) / 2}.
              </p>
              {statCheck((char.cha - 10) / 2, 13, d20) ? (
                <div>
                  <p>
                    You burst forth from the trees before screeching a terrible
                    war cry. Waving your weapon wildly about. In flash the
                    goblins run off howling and yelping into the trees. You
                    won't be seeing them again any time soon. <br /> But, what
                    now?
                  </p>
                  <button onClick={() => setSubEvent("turnBack")}>
                    Turn back to the road.
                  </button>
                  <button onClick={() => setSubEvent("continue")}>
                    A shortcut through the forest?
                  </button>
                </div>
              ) : (
                <div>
                  <p>
                    You burst forth from the trees, howling and screaking. The
                    goblins turn to face you. It seems you don't scare them
                    much.
                  </p>
                  <button onClick={() => setSubEvent("goblinsForest")}>
                    Could have gone better.
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
              <p>
                Perception check: you roll a {d20} + {(char.wis - 10) / 2}.
              </p>
              {statCheck((char.wis - 10) / 2, 14, d20) ? (
                <div>
                  <p>
                    The road winds on through the forest for many miles. It's
                    quite calm and peaceful. If you didn't know better you'd be
                    tempted to let your guard down. But you do know better. You
                    hear a rumbling through the trees. It's ambush.
                  </p>
                  <button onClick={() => setSubEvent("goblinsRoad")}>
                    To arms!
                  </button>
                </div>
              ) : (
                <div>
                  <p>
                    The road winds on through the forest for many miles. It's
                    quite calm and peaceful. You start to hum out a somber tune
                    to yourself as you walk. Suddenly, something leaps forth out
                    of the trees.
                  </p>
                  <button
                    onClick={() => {
                      setChar((prevChar) => ({
                        ...prevChar,
                        hp: prevChar.hp - 4,
                      }));
                      setSubEvent("goblinsRoad");
                    }}
                  >
                    To arms!
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Play;
