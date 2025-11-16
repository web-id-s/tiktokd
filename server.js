// server.js
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const API_URL = "https://api.jasaotp.id/v1";
const API_KEY = process.env.JASA_KEY;

// Auto Buy NOKOS
app.post("/buy", async (req, res) => {
  try {
    const { service, server_id, qty } = req.body;

    const response = await axios.post(
      API_URL + "/purchase",
      {
        service,
        server_id,
        qty,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (e) {
    res.json({ error: e.message, detail: e.response?.data });
  }
});

// Serve frontend HTML
app.use(express.static(__dirname));

app.listen(3000, () => console.log("Running on port 3000"));
