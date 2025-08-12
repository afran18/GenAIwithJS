import React, { useState } from "react";
import "./App.css";
import CustomTokenizer from "./customTokenizer.js";

const tokenizer = new CustomTokenizer();

export default function App() {
  const [input, setInput] = useState("");
  const [tokens, setTokens] = useState([]);
  const [decoded, setDecoded] = useState("");

  const handleTokenize = (e) => {
    e.preventDefault();
    const encoded = tokenizer.encode(input);
    setTokens(encoded);
    setDecoded(tokenizer.decode(encoded));
  };

  return (
    <div className="container">
      <h1>Custom Tokenizer Demo</h1>

      <form className="searchForm" onSubmit={handleTokenize}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something here..."
        />

        <button type="submit">
          Tokenize
        </button>
      </form>

      <div className="tokenDiv">
        <div className="encodeDiv">
          <h3>Tokens:</h3>
          <pre>{JSON.stringify(tokens)}</pre>
        </div>

        <div className="decodeDiv">
          <h3>Decoded Text:</h3>
          <pre>{decoded}</pre>
        </div>
      </div>
    </div>
  );
}
