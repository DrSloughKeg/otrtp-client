import React from "react";

function ThirdEvent({
  subEvent,
  setSubEvent,
  d20,
  char,
  statCheck,
  setChar,
  changePlayEvent,
  updateCharacter,
}) {
  setSubEvent("");
  return (
    <div>
      {subEvent === "" && (
        <div>
          <img src="road_cart.png" alt="a cart in the road" />
          <p>You killed a bunch of Goblins. Good for you.</p>
          <button onClick={() => setSubEvent("")}>Investigate</button>
          <button onClick={() => setSubEvent("")}>Pass it by</button>
        </div>
      )}
    </div>
  );
}

export default ThirdEvent;
