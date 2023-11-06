const express = require("express");
const cors = require("cors");
const { ocr } = require("./libs/tesseractOcr");
const { wordSuggestions } = require("./libs/wordSuggestions");
const { levenshteinDistance } = require("./libs/levenshteinDistance");
const { commonWords } = require("./utils/keywords-eng.json");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

app.post("/ocr", async (req, res) => {
  const { image, keywords } = req.body;

  try {
    const ocrRes = await ocr({
      url: image.url.replace(/ /g, "")
    });
    let correctedText = "";

    ocrRes.forEach((job) => {
      const words = job.data.text.split(/\b/);
      console.log(words);
      const correctedWords = words.map((word) => {
        const suggestions = wordSuggestions(
          word,
          keywords,
          levenshteinDistance
        );
        return suggestions.length > 0 ? suggestions[0] : word;
      });
      correctedText = correctedWords.join("").replace(/\s+/g, " ");
    });
    res.json({ correctedText });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.listen(port, () => {
  console.log("Server is listening on port 8080");
});
