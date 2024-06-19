import express from "express";
import dotenv from "dotenv";
import { config } from "./config/config.js";
import noteRoute from "./routes/note-route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      message: "API NOTE IS ALIVE",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.use("/notes", noteRoute);

app.listen(config.port, () => {
  console.log(`Server running in ${config.baseUrl}`);
});
