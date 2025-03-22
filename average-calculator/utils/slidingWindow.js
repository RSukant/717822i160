const { WINDOW_SIZE } = require("../config");

let numberWindow = [];

const updateWindow = (newNumbers) => {
  const prevState = [...numberWindow];

  newNumbers.forEach((num) => {
    if (!numberWindow.includes(num)) {
      numberWindow.push(num);
    }
  });

  if (numberWindow.length > WINDOW_SIZE) {
    numberWindow = numberWindow.slice(-WINDOW_SIZE);
  }

  const avg = numberWindow.length
    ? (numberWindow.reduce((a, b) => a + b, 0) / numberWindow.length).toFixed(2)
    : 0;

  return { prevState, currState: numberWindow, avg: parseFloat(avg) };
};

module.exports = { updateWindow };
