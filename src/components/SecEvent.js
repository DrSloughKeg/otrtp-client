import React, { useState } from "react";

function SecEvent({ d20, char, statCheck, setChar }) {
  const [menuSelection, setMenuSelection] = useState("actions");
  const [subSelection, setSubSelect] = useState("");

  const actionDescriptions = {
    attack: "Take the attack action",
    dodge: "Perform a dodge maneuver",
    disengage: "Attempt to disengage from combat",
    secondWind: "Use your Second Wind ability to recover health",
    health: "Drink a health potion",
    mana: "Consume a mana potion",
    // Add more actions and descriptions as needed
  };

  const [combatText, setCombatText] = useState("");

  const [goblinHealth, setGobHP] = useState(12);

  const handlePlayerAction = (action) => {
    setCombatText("");
    switch (action) {
      case "attack":
        setGobHP(goblinHealth - 6);
        setCombatText(
          combatText +
            "You attack the goblins and deal 6 points of damage. The goblins have X Hp remaining."
        );
        enemyAttack();
        break;
      case "dodge":
        // Apply dodge effect
        break;
      case "disengage":
        // Apply disengage effect
        break;
      case "secondWind":
        // Apply Second Wind effect
        break;
      case "health":
        // Apply health potion effect
        break;
      case "mana":
        // Apply mana potion effect
        break;
      default:
        // Default case
        break;
    }
  };

  const enemyAttack = () => {
    // Simulate enemy's attack
    setChar((prevChar) => ({
      ...prevChar,
      hp: prevChar.hp - 3, // Enemy deals 3 damage
    }));
    setCombatText(
      combatText + "<br /> The goblins attack you dealing 3 points of damage."
    );
  };

  return (
    <div>
      <div>
        <img src="road_goblins.png" alt="A group of goblins" />
      </div>
      <div className="combatText">{combatText}</div>
      <div className="combatMenu">
        <div className="mainChoices">
          <div>
            <p
              className={menuSelection === "actions" ? "selectedMenuItem" : ""}
              onClick={() => {
                setMenuSelection("actions");
              }}
            >
              Actions
            </p>
            <p
              className={
                menuSelection === "abilities" ? "selectedMenuItem" : ""
              }
              onClick={() => {
                setMenuSelection("abilities");
              }}
            >
              Abilities
            </p>
            <p
              className={menuSelection === "items" ? "selectedMenuItem" : ""}
              onClick={() => {
                setMenuSelection("items");
              }}
            >
              Items
            </p>
          </div>
        </div>
        <div className="mainBox">
          {menuSelection === "actions" && (
            <div className="subChoices">
              <p
                onMouseEnter={() => setSubSelect("attack")}
                onClick={() => handlePlayerAction("attack")}
              >
                Attack
              </p>
              <p
                onMouseEnter={() => setSubSelect("dodge")}
                onClick={() => handlePlayerAction("dodge")}
              >
                Dodge
              </p>
              <p
                onMouseEnter={() => setSubSelect("disengage")}
                onClick={() => handlePlayerAction("disengage")}
              >
                Disengage
              </p>
            </div>
          )}
          {menuSelection === "abilities" && (
            <div className="subChoices">
              <p
                onMouseEnter={() => setSubSelect("secondWind")}
                onClick={() => handlePlayerAction("secondWind")}
              >
                Second Wind
              </p>
            </div>
          )}
          {menuSelection === "items" && (
            <div className="subChoices">
              <p
                onMouseEnter={() => setSubSelect("health")}
                onClick={() => handlePlayerAction("health")}
              >
                Health Potion
              </p>
              <p
                onMouseEnter={() => setSubSelect("mana")}
                onClick={() => handlePlayerAction("mana")}
              >
                Mana Potion
              </p>
            </div>
          )}
          <div className="descriptivetext">
            <p>{actionDescriptions[subSelection] || "Choose an action"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecEvent;
