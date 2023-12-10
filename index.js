const express = require("express");
const cors = require("cors");
const Replicate = require("replicate");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" });
});

app.post("/replicate", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const output = await replicate.run(
        "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
        {
          input: {
            width: 320,
            height: 320,
            num_outputs: 1,
            prompt: prompt,
            prompt_strength: 0.6,
          },
        }
      );
      res.json({ img: output });
  } catch (error) {
    console.log(error)
    res.json({ status: 201 });
  }
});

app.listen(9000, () => {
  console.log("Example app listening on port 9000!");
});
