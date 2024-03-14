import React from "react";

function GoodEndEvent({ subEvent }) {
  return (
    <div>
      {subEvent === "" && (
        <div>
          <img src="game_happy_end.png" alt="Thank you for playing" />
          <p>
            Thank you for playing "On The Road To Phandelver"! <br />
            To be continued...
          </p>
        </div>
      )}
    </div>
  );
}

export default GoodEndEvent;
