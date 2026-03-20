import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "";

async function test() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("hi");
    console.log("Success:", result.response.text());
  } catch (error) {
    console.log("Error:", error.message);
  }
}

test();
