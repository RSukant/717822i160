const express = require("express");
const { PORT } = require("./config");
const { fetchNumbers } = require("./services/numberService");
const { updateWindow } = require("./utils/slidingWindow");

const app = express();

app.get("/numbers/:numberid", async (req, res) => {
  const { numberid } = req.params;
  if (!["p", "f", "e", "r"].includes(numberid)) {
    return res.status(400).json({ error: "Invalid number ID" });
  }

  const newNumbers = await fetchNumbers(numberid);
  const { prevState, currState, avg } = updateWindow(newNumbers);

  res.json({
    windowPrevState: prevState,
    windowCurrState: currState,
    numbers: newNumbers,
    avg,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
