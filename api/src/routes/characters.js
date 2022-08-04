const { Router } = require("express");
const router = Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const { page } = req.query;
  try {
    const result = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    res.json(result.data);
  } catch (error) {
    console.log(error);
    res.json({ msg: "error" });
  }
});

router.get("/search", async (req, res) => {
  const { page, name } = req.query;
  let obj;
  if (name) {
    try {
      const result = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${page}&name=${name}`
      );
      result.data.isQuery = true;
      obj = result.data;
    } catch (error) {
      obj = { msg: "error", description: "Not found" };
      console.log(error);
    }
  } else {
    const result = await axios.get(`https://rickandmortyapi.com/api/character`);
    obj = result.data;
  }
  res.status(200).json(obj);
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await axios.get(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    res.json(result.data);
  } catch (error) {
    console.log(error);
    res.json({ msg: "error" });
  }
});

module.exports = router;
