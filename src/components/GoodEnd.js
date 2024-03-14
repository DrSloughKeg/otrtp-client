import React from "react";

function GoodEndEvent({ subEvent }) {
  return (
    <div>
      {subEvent === "" && (
        <div>
          <img src="game_happy_end.png" alt="Thank you for playing" />
          <p>
            Thank you for playing "On The Road To Phandelver"! <br />
            <br />
            To be continued...
          </p>
          <br />
          <br />
          <br />
          <p>Art by: Luna</p>
          <br />
          <p>Code by: Benjamin Pye</p>
        </div>
      )}
    </div>
  );
}

export default GoodEndEvent;
