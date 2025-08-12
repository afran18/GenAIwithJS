export default class CustomTokenizer {
  constructor() {
    this.tokenToId = {};
    this.idToToken = {};
  }

  generateRandomId() {
    const digits = Math.floor(Math.random() * (6 - 2 + 1)) + 2;
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  encode(text) {
  const tokens = text.split(/(\s+|[,.!?])/); 

  const tokenIds = tokens.map((token) => {
    if (!this.tokenToId[token]) {
      let newId;
      do {
        newId = this.generateRandomId();
      } while (this.idToToken[newId]);
      this.tokenToId[token] = newId;
      this.idToToken[newId] = token;
    }
    return this.tokenToId[token];
  });

  return tokenIds;
}

decode(tokenIds) {
  return tokenIds.map((id) => this.idToToken[id] || "").join("");
}
}

