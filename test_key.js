const apiKey = "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";

async function test() {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-super-120b-a12b:free",
          messages: [{ role: "user", content: "hi" }]
        })
      }
    );
    console.log("Status:", response.status);
    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.log("Error:", error.message);
  }
}

test();
