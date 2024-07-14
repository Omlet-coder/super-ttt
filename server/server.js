import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import { makeAMove, reset, state } from "./state.js";

const app = express();
const PORT = 8080;

// Middleware to parse JSON bodies
app.use(cors());
app.use(bodyParser.json());

// GET handler for /board
app.get('/board', (req, res) => {
    console.log("GET: /board");
    res.json({ state });
});

// POST handler for /move
app.post('/move', (req, res) => {
  console.log("POST: /move");
  const { bigBoard, smallBoard } = req.body;
  // Here you can process the move data and update the boards
  // For simplicity, we'll just update the local boards with the received data
  const result = makeAMove(bigBoard, smallBoard);
  res.json({result})
});

// GET handler for /reset
app.get('/reset', (req, res) => {
  console.log("GET: /reset");    
  reset();
  res.json({ok: "ok"})
});

// Start server
reset();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
