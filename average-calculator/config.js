require("dotenv").config();

module.exports = {
  PORT: 9876,
  WINDOW_SIZE: 10,
  API_URLS: {
    p: "http://20.244.56.144/test/primes",
    f: "http://20.244.56.144/test/fibo",
    e: "http://20.244.56.144/test/even",
    r: "http://20.244.56.144/test/rand",
  },
  HEADERS: {
    "Client-Id": process.env.CLIENT_ID,
    "Client-Secret": process.env.CLIENT_SECRET,
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  },
};
