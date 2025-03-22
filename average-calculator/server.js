const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;

const NUMBER_API = {
  p: "http://20.244.56.144/test/primes",
  f: "http://20.244.56.144/test/fibo",
  e: "http://20.244.56.144/test/even",
  r: "http://20.244.56.144/test/rand",
};

let numberWindow = [];

const fetchNumbers = async (type) => {
  try {
    const response = await axios.get(NUMBER_API[type], { timeout: 500 });
    return response.data.numbers || [];
  } catch (error) {
    console.error("Error fetching numbers:", error.message);
    return [];
  }
};

app.get("/numbers/:numberid", async (req, res) => {
  const { numberid } = req.params;
  if (!["p", "f", "e", "r"].includes(numberid)) {
    return res.status(400).send("Invalid number ID. Use 'p', 'f', 'e', or 'r'.");
  }

  const prevState = [...numberWindow];
  const newNumbers = await fetchNumbers(numberid);

  newNumbers.forEach((num) => {
    if (!numberWindow.includes(num)) {
      numberWindow.push(num);
    }
  });

  if (numberWindow.length > WINDOW_SIZE) {
    numberWindow = numberWindow.slice(-WINDOW_SIZE);
  }

  const avg =
    numberWindow.length > 0
      ? (numberWindow.reduce((a, b) => a + b, 0) / numberWindow.length).toFixed(2)
      : 0;

  const responseData = {
    windowPrevState: prevState,
    windowCurrState: numberWindow,
    numbers: newNumbers,
    avg: parseFloat(avg),
  };

  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(responseData, null, 2)); // Formats output with new lines
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
