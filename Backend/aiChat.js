const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const ai = new GoogleGenAI({ apiKey: process.env.apiKey });

async function main(msg) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: msg,
  });
  return response.text;
}

module.exports = main;
