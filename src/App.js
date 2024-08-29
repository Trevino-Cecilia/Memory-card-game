import React, { useState } from "react";
import GameCard from "./GameCard";
import "./App.css";
import { every, shuffle } from "lodash";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const animals = [
  {
    name: "cat",
    img: require("./img/cat.png"),
  },
  {
    name: "dog",
    img: require("./img/dog.png"),
  },
  {
    name: "lion",
    img: require("./img/lion.png"),
  },
  {
    name: "rabbit",
    img: require("./img/rabbit.png"),
  },
  {
    name: "turtle",
    img: require("./img/turtle.png"),
  },
  {
    name: "elephant",
    img: require("./img/elephant.png"),
  },
  {
    name: "fish",
    img: require("./img/fish.png"),
  },
  {
    name: "monkey",
    img: require("./img/monkey.png"),
  },
  {
    name: "horse",
    img: require("./img/horse.png"),
  },
  {
    name: "lemur",
    img: require("./img/lemur.png"),
  },
  {
    name: "zebra",
    img: require("./img/zebra.png"),
  },
  {
    name: "giraffe",
    img: require("./img/giraffe.png"),
  },
  {
    name: "penguin",
    img: require("./img/penguin.png"),
  },
  {
    name: "crocodile",
    img: require("./img/crocodile.png"),
  },
  {
    name: "koala",
    img: require("./img/koala.png"),
  },
  {
    name: "wolf",
    img: require("./img/wolf.png"),
  },
  {
    name: "fox",
    img: require("./img/fox.png"),
  },
  {
    name: "tiger",
    img: require("./img/tiger.png"),
  },
];

// Counter Component
const Counter = ({ counter }) => {
  return (
    <div className="counter">
      <h2>Counter: {counter}</h2>
    </div>
  );
};

export const Rules = () => {
  return (
    <div className="rules">
      <h2>Rules: Match all the animal pairs to win!</h2>
    </div>
  );
};

export default function MyApp() {
  const [gameboardState, setGameboardState] = useState(
    shuffle([...animals, ...animals])
  );
  const [currentFlipped, setCurrentFlipped] = useState([]);
  const [counter, setCounter] = useState(0);

  const handleCardClick = (index, animal) => {
    if (currentFlipped.length === 1) {
      setCurrentFlipped([...currentFlipped, index]);
      if (gameboardState[currentFlipped[0]].name === animal) {
        const updateArray = [...gameboardState];
        updateArray[currentFlipped[0]].found = true;
        updateArray[index].found = true;
        setGameboardState(updateArray);
        setCounter(counter + 1);
        if (every(updateArray, { found: true })) {
          alert("Yay you won!");
        }
      } else {
        setTimeout(() => {
          setCurrentFlipped([]);
        }, 2000);
      }
    } else {
      setCurrentFlipped([index]);
    }
  };

  return (
    <div className="App">
      <Header
        setGameboardState={setGameboardState}
        gameboardState={gameboardState}
      />

      <div className="main-content"></div>
      <Counter counter={counter} />
      <div className="gameboard-container">
        <div className="gameboard">
          {gameboardState.map((card, idx) => (
            <div key={idx}>
              <GameCard
                card={card}
                onClick={() => {
                  if (!card.found && !currentFlipped.includes(idx)) {
                    handleCardClick(idx, card.name);
                  }
                }}
                flipped={currentFlipped.includes(idx) || card.found}
              />
            </div>
          ))}
        </div>
        <Rules />
      </div>

      <Footer />
    </div>
  );
}
