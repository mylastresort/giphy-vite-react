import "./Form.css";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { searchAsync } from "./store";

export default function Form() {
  const input = useRef("");

  const debounce = useRef();

  useEffect(() => () => clearTimeout(debounce.current), []);

  const dispatch = useDispatch();

  function handleChange(event) {
    input.current = event.target.value;
    clearTimeout(debounce.current);
    debounce.current = setTimeout(
      () => dispatch(searchAsync(input.current)),
      500
    );
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label className="input_label" htmlFor="search">
        Look Up New Gifs
      </label>
      <input
        className="input"
        autoComplete="off"
        name="search"
        onChange={handleChange}
        placeholder="eg: cat, dog, etc.."
        type="text"
      />
    </form>
  );
}
