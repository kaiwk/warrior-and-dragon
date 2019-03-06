import React, { Component } from "react";

import Graph from "./components/Graph";
import GameMenu from "./components/GameMenu";

import "./style/style.scss";

const App = () => {
  return (
    <div>
      <GameMenu />
      <Graph />
    </div>
  );
};

export default App;
