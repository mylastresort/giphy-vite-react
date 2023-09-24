import "./App.css";
import React from "react";
import Display from "./Display";
import Form from "./Form";

export const _cache = new Map();

function App() {
  return (
    <div className="App">
      <Form />
      <Display />
    </div>
  );
}

export default App;
