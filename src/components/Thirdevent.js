import React from "react";

function ThirdEvent({
  subEvent,
  setSubEvent,
  d20,
  char,
  statCheck,
  changePlayEvent,
}) {
  return (
    <div>
      {subEvent === "" && (
        <div>
          <p>
            Those goblins were no match for you. But now you've strayed from the
            road. The way back might take all evening. But what of the way
            forwards?
          </p>
          <button onClick={() => setSubEvent("turnBack")}>Turn back</button>
          <button onClick={() => setSubEvent("shortcut")}>
            Look for a shortcut through the woods
          </button>
        </div>
      )}
      {subEvent === "turnBack" && (
        <div>
          <p>
            You head back the way you came. It may take longer but it's probably
            safest. Who knows what else lurks in these woods.
          </p>
          <button
            onClick={() => {
              const updatedChar = {
                ...char,
                evnt: 4,
              };
              changePlayEvent(4, updatedChar);
            }}
          >
            Continue
          </button>
        </div>
      )}
      {subEvent === "shortcut" && (
        <div>
          <p>
            You push on through the woods. If you head east you should make it
            back to the road, and maybe even save yourself some time.
          </p>
          <p>
            Perception check: you roll a {d20} + {(char.wis - 10) / 2}.
          </p>
          {statCheck((char.wis - 10) / 2, 14, d20) ? (
            <div>
              <p>
                As you walk along your keen eyes spot a patch of sandy brown on
                the forest floor. You toss in a rock to test it, and it's sinks
                quick. If you hadn't been so sharp you might have become trapped
                within.
              </p>
              <button onClick={() => setSubEvent("oracleSkip")}>
                That would have been bad.
              </button>
            </div>
          ) : (
            <div>
              <p>
                Suddenly as your walking the ground melts away before you. You
                find yourself sinking in a pit of quicksand.
              </p>
            </div>
          )}
        </div>
      )}
      {subEvent === "oracleSkip" && (
        <div>
          <p>
            You press on through the woods. You march all evening. Trying to get
            back to the road before dusk. And as you walk you come to a cliff
            side. Before you stands a strange figure with an aura of magic.
            <br />
            Could this be the Great Oracle?
          </p>
          <button
            onClick={() => {
              const updatedChar = {
                ...char,
                evnt: 7,
              };
              changePlayEvent(7, updatedChar);
            }}
          >
            Approach them.
          </button>
        </div>
      )}
    </div>
  );
}

export default ThirdEvent;
