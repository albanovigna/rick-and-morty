const { Router } = require("express");
const router = Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { episodes } = req.body;
  let arrayEpisodes = [];

  try {
    const urls = episodes.map((e) => e.map(async (u) => await axios.get(u)));

    for (let array of urls) {
      const resp = await Promise.all(array);
      arrayEpisodes = [...arrayEpisodes, resp.map((resp) => resp.data)];
    }

    res.json(arrayEpisodes);
  } catch (error) {
    console.log(error);
    res.json({ msg: "error" });
  }
});

module.exports = router;
