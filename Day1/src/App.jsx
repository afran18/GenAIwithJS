import React, { useState } from "react";
import CustomTokenizer from "./customTokenizer.js"; 

const tokenizer = new CustomTokenizer();

export default function App() {
  const [input, setInput] = useState("");
  const [tokens, setTokens] = useState([]);
  const [decoded, setDecoded] = useState("");

  const handleTokenize = () => {
    const encoded = tokenizer.encode(input);
    setTokens(encoded);
    setDecoded(tokenizer.decode(encoded));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Custom Tokenizer Demo</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        cols={50}
        placeholder="Type something here..."
        style={{ display: "block", marginBottom: "10px", padding: "5px" }}
      />

      <button onClick={handleTokenize} style={{ padding: "5px 10px" }}>
        Tokenize
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>Tokens:</h3>
        <pre>{JSON.stringify(tokens, null, 2)}</pre>

        <h3>Decoded Text:</h3>
        <pre>{decoded}</pre>
      </div>
    </div>
  );
}
