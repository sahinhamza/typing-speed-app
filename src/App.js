import React from "react";
import { Dropdown } from "./components/dropdown";
import { Textbox } from "./components/textbox";
import { Input } from "./components/input";
import { Result } from "./components/result";

function App() {
  return (
    <div className="App">
      <Dropdown />
      <Textbox />
      <Input />
      <Result />
    </div>
  );
}

export default App;
